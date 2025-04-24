
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { events } from "@/lib/data";
import { BookOpen, Calendar, GraduationCap, User } from "lucide-react";
import { EventCard } from "@/components/dashboard/EventCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    section: user?.section || '',
    department: user?.department || ''
  });
  
  // Get all events from localStorage
  const allEvents = localStorage.getItem('events') 
    ? JSON.parse(localStorage.getItem('events')!) 
    : events;
  
  // Simulate registered events (in a real app, this would come from the database)
  const registeredEvents = allEvents.slice(0, 2);
  
  // Get user initials for avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Update the user profile in AuthContext
    updateUserProfile({
      ...user!,
      name: profileData.name,
      section: profileData.section,
      department: profileData.department
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-heading mb-2">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt={user?.name || "User"} />
                    <AvatarFallback className="text-2xl bg-primary text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {isEditing ? (
                  <Input
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="text-center font-bold text-xl mb-1"
                  />
                ) : (
                  <CardTitle>{user?.name}</CardTitle>
                )}
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Badge variant="outline" className="capitalize">
                    {user?.role}
                  </Badge>
                </div>
                
                <div className="pt-4 space-y-3">
                  {isEditing ? (
                    <>
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span className="w-full">
                          <Input
                            name="section"
                            value={profileData.section}
                            onChange={handleInputChange}
                            placeholder="Enter your section"
                          />
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span className="w-full">
                          <Input
                            name="department"
                            value={profileData.department}
                            onChange={handleInputChange}
                            placeholder="Enter your department"
                          />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {user?.section && (
                        <div className="flex items-center text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span>Section: {user.section}</span>
                        </div>
                      )}
                      
                      {user?.department && (
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>Department: {user.department}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>VNR VJIET</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button className="w-full" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" variant="outline" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="registered">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="registered">My Registrations</TabsTrigger>
                <TabsTrigger value="history">Event History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="registered" className="pt-4">
                {registeredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {registeredEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-600">No registrations yet</h3>
                    <p className="text-gray-500 mt-1">Explore events and register to see them here</p>
                    <Button variant="outline" className="mt-4">Browse Events</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="pt-4">
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-600">No event history</h3>
                  <p className="text-gray-500 mt-1">Your attended events will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
