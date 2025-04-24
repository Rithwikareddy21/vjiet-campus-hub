
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { themes, venues, events as eventsData } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { format, differenceInCalendarDays } from "date-fns";
import { CalendarIcon, CheckCircle, FileImage } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Event } from "@/lib/types";

// Define form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  theme: z.string().min(1, "Please select a theme"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  venue: z.string().min(1, "Please select a venue"),
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, "Please enter a start time"),
  endTime: z.string().min(1, "Please enter an end time"),
  speaker: z.string().min(3, "Speaker name is required"),
  allowedSections: z.array(z.string()).min(1, "Select at least one section"),
  maxSeats: z.string().min(1, "Maximum seats is required"),
  gadgetRequirements: z.string().optional(),
  coordinators: z.string().min(3, "Coordinator information is required"),
  registrationOpen: z.boolean().default(true),
  imageUrl: z.string().optional(),
});

const AddEventPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // If not admin or faculty, redirect
  if (user?.role !== "admin" && user?.role !== "faculty") {
    return <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold font-heading mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
      </div>
    </Layout>;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      theme: "",
      description: "",
      venue: "",
      startTime: "10:00",
      endTime: "12:00",
      speaker: "",
      allowedSections: [],
      maxSeats: "",
      gadgetRequirements: "",
      coordinators: "",
      registrationOpen: true,
      imageUrl: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        form.setValue("imageUrl", result); // Store the base64 image data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Get selected venue details
    const selectedVenue = venues.find(v => v.name === values.venue);
    
    if (!selectedVenue) {
      toast({
        title: "Venue Error",
        description: "Selected venue not found",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate days left until event
    const daysLeft = differenceInCalendarDays(values.date, new Date());
    
    // Use placeholder image if no image is selected
    const eventImage = values.imageUrl || "https://picsum.photos/800/400";
    
    // Create new event object
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      title: values.title,
      theme: values.theme as any,
      description: values.description,
      venue: selectedVenue,
      date: format(values.date, 'yyyy-MM-dd'),
      startTime: values.startTime,
      endTime: values.endTime,
      speaker: values.speaker,
      allowedSections: values.allowedSections,
      maxSeats: parseInt(values.maxSeats),
      registrationOpen: values.registrationOpen,
      imageUrl: eventImage,
      gadgetRequirements: values.gadgetRequirements || undefined,
      coordinators: values.coordinators.split(',').map(c => c.trim()),
      status: "upcoming",
      daysLeft: daysLeft
    };
    
    // Get existing events from localStorage
    const existingEvents = localStorage.getItem('events') 
      ? JSON.parse(localStorage.getItem('events')!) 
      : eventsData;
    
    // Add new event to events data array
    existingEvents.unshift(newEvent);
    
    // Save updated events to localStorage
    localStorage.setItem('events', JSON.stringify(existingEvents));
    
    toast({
      title: "Event Created",
      description: `The event ${values.title} has been created successfully.`,
    });
    
    // Redirect to the theme detail page for the new event
    navigate(`/themes/${values.theme}`);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">Add New Event</h1>
        <p className="text-gray-600 mb-6">
          Create a new event or program for one of the five themes.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Fill in the details for the new event. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {themes.map((theme) => (
                              <SelectItem key={theme.id} value={theme.id}>
                                {theme.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* New Image Upload Section */}
                <div className="space-y-2">
                  <FormLabel>Cover Image</FormLabel>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="max-w-md"
                      />
                      <FileImage className="text-gray-400 h-5 w-5" />
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-2 border rounded-md overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Event preview"
                          className="w-full h-40 object-cover" 
                        />
                      </div>
                    )}
                  </div>
                  <FormDescription>
                    Upload a cover image for your event (recommended size: 800x400px)
                  </FormDescription>
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter a detailed description of the event" 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a venue" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {venues.map((venue) => (
                              <SelectItem key={venue.name} value={venue.name}>
                                {venue.name} ({venue.location}) - Max: {venue.capacity}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="speaker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaker *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter speaker name and designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allowedSections"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Allowed Sections *</FormLabel>
                        <FormDescription>
                          Select which sections are allowed to attend this event
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {["CSE-A", "CSE-B", "CSE-C", "CSE-D", "CSBS"].map((section) => (
                          <FormField
                            key={section}
                            control={form.control}
                            name="allowedSections"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={section}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(section)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, section])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== section
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {section}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="maxSeats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Seats *</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="Enter maximum seats" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gadgetRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gadget Requirements</FormLabel>
                        <FormControl>
                          <Input placeholder="What students should bring (optional)" {...field} />
                        </FormControl>
                        <FormDescription>
                          For example: "Laptop with Node.js installed"
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="coordinators"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coordinators *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter coordinator names" {...field} />
                      </FormControl>
                      <FormDescription>
                        Add coordinator names separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="registrationOpen"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Open for Registration</FormLabel>
                        <FormDescription>
                          Allow students to register for this event
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <CardFooter className="flex justify-end px-0">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <CheckCircle className="mr-2 h-4 w-4" /> Create Event
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddEventPage;
