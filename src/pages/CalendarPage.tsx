
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { events as defaultEvents } from "@/lib/data";
import { Event } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO, isEqual, isSameDay, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, CalendarClock } from "lucide-react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Load events from localStorage if available
    const savedEvents = localStorage.getItem('events');
    setEvents(savedEvents ? JSON.parse(savedEvents) : defaultEvents);
  }, []);

  // Convert event dates to Date objects
  const eventDates = events.map(event => parseISO(event.date));
  
  // Filter events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => isSameDay(parseISO(event.date), date))
    : [];

  // Get event status color
  const getStatusColor = (status: string) => {
    switch (status) {
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

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">Event Calendar</h1>
        <p className="text-gray-600 mb-6">
          View and explore all scheduled events. Select a date to see events happening on that day.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-4 rounded-lg border shadow-sm">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-3 pointer-events-auto"
              modifiers={{
                hasEvent: eventDates,
              }}
              modifiersStyles={{
                hasEvent: { 
                  fontWeight: "bold",
                  backgroundColor: "rgba(220, 38, 38, 0.1)",
                  color: "#dc2626",
                  borderRadius: "100%" 
                }
              }}
            />
            
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-semibold mb-2">Legend</h3>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-100"></div>
                <span className="text-sm text-gray-600">Events</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold font-heading">
                  {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                </h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (date) {
                        const newDate = new Date(date);
                        newDate.setDate(newDate.getDate() - 1);
                        setDate(newDate);
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (date) {
                        const newDate = new Date(date);
                        newDate.setDate(newDate.getDate() + 1);
                        setDate(newDate);
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="p-4 border rounded-md bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarClock className="h-4 w-4 mr-2" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {event.venue.name}, {event.venue.location}
                        </p>
                        <Link to={`/events/${event.id}`}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <CalendarClock className="h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium text-gray-500">No events on this date</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Select another date or browse all events
                  </p>
                  <Link to="/themes" className="mt-4">
                    <Button variant="outline">View All Events</Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
