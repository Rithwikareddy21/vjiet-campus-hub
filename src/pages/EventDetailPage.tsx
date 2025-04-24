
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { themes } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ArrowLeft, User, PlusCircle, CalendarPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Event } from "@/lib/types";

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [isRegistered, setIsRegistered] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      setEvents(parsedEvents);
      // Find the specific event by ID
      const foundEvent = parsedEvents.find((e: Event) => e.id === eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId]);
  
  // If event not found
  if (!event) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold font-heading mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, the event you are looking for does not exist.
          </p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Default fallback image if the event image URL is empty or invalid
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";

  // Find theme
  const theme = themes.find((t) => t.id === event.theme);
  
  // Status badge color
  const getStatusColor = () => {
    switch (event.status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Handle registration
  const handleRegister = () => {
    setIsRegistered(true);
    toast({
      title: "Registration Successful",
      description: `You have been registered for ${event.title}`,
    });
  };

  // Add to calendar
  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: `${event.title} has been added to your calendar`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-md border">
          <div className="h-64 overflow-hidden">
            <img
              src={event.imageUrl || fallbackImage}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== fallbackImage) {
                  target.src = fallbackImage;
                }
              }}
            />
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-2 justify-between items-start mb-4">
              <h1 className="text-3xl font-bold font-heading">{event.title}</h1>
              <Badge className={getStatusColor()}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>
                    {event.venue.name}, {event.venue.location}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3" />
                  <span>
                    Max Seats: {event.maxSeats}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-3" />
                  <span>
                    Speaker: {event.speaker}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Allowed Sections:</h3>
                <div className="flex flex-wrap gap-2">
                  {event.allowedSections.map((section) => (
                    <Badge key={section} variant="outline">
                      {section}
                    </Badge>
                  ))}
                </div>
                
                {event.gadgetRequirements && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">What to Bring:</h3>
                    <p className="text-gray-600">{event.gadgetRequirements}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold font-heading mb-2">About This Program</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold font-heading mb-2">Coordinators</h2>
              <div className="flex flex-wrap gap-2">
                {event.coordinators.map((coordinator, index) => (
                  <Badge key={index} variant="secondary">
                    {coordinator}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-between items-center pt-4 border-t">
              <Badge variant="outline" className={theme?.color || ""}>
                {theme ? theme.name : event.theme}
              </Badge>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleAddToCalendar}
                >
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                
                {event.status === "upcoming" && event.registrationOpen ? (
                  isRegistered ? (
                    <Button disabled className="bg-green-500 hover:bg-green-600">
                      Registered
                    </Button>
                  ) : (
                    <Button onClick={handleRegister}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Register Now
                    </Button>
                  )
                ) : event.status === "completed" ? (
                  <Button disabled variant="outline">
                    Event Completed
                  </Button>
                ) : (
                  <Button disabled variant="outline">
                    Registration Closed
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
