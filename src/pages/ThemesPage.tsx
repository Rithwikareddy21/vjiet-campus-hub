
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { themes, events as defaultEvents } from "@/lib/data";
import { Event } from "@/lib/types";
import { ThemeCard } from "@/components/dashboard/ThemeCard";
import { EventCard } from "@/components/dashboard/EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const ThemesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const { isStaff } = useAuth();

  useEffect(() => {
    // Load events from localStorage if available, otherwise use defaults
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Error parsing saved events:", error);
        // If there's an error parsing, initialize with default events
        localStorage.setItem('events', JSON.stringify(defaultEvents));
      }
    } else {
      // If no saved events, save the default events
      localStorage.setItem('events', JSON.stringify(defaultEvents));
    }
  }, []);

  // Count events per theme
  const themeEventCount = themes.map((theme) => {
    const count = events.filter((event) => event.theme === theme.id).length;
    return { ...theme, count };
  });

  // Filter events by search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Themes & Programs</h1>
            <p className="text-gray-600">
              Explore all five themes and their associated programs. Each theme offers unique opportunities for your personal and professional growth.
            </p>
          </div>
          
          {isStaff && (
            <Link to="/add-event">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </Link>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="themes">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="themes">All Themes</TabsTrigger>
            <TabsTrigger value="events">All Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="themes" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themeEventCount.map((theme) => (
                <Link to={`/themes/${theme.id}`} key={theme.id}>
                  <ThemeCard theme={theme} eventCount={theme.count} />
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No events match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ThemesPage;
