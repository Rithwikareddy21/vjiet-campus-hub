
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Event } from "@/lib/types";
import { events, themes } from "@/lib/data";
import { EventCard } from "@/components/dashboard/EventCard";
import { ThemeCard } from "@/components/dashboard/ThemeCard";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const isAdmin = user?.role === "admin" || user?.role === "faculty";

  useEffect(() => {
    // Filter and sort upcoming events
    const upcoming = events
      .filter(event => event.status === "upcoming")
      .sort((a, b) => {
        if (a.daysLeft !== undefined && b.daysLeft !== undefined) {
          return a.daysLeft - b.daysLeft;
        }
        return 0;
      })
      .slice(0, 4);
    
    setUpcomingEvents(upcoming);
  }, []);

  // Count events per theme
  const themeEventCount = themes.map(theme => {
    const count = events.filter(event => event.theme === theme.id).length;
    return { ...theme, count };
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-pink-50 to-blue-50 p-6 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-heading text-gray-800">
                Welcome to Career Vision Approach, {user?.name}!
              </h1>
              <p className="mt-2 text-gray-600">
                Explore upcoming events, register for programs, and enhance your career prospects.
              </p>
            </div>
            {isAdmin && (
              <Link to="/add-event">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold font-heading">Upcoming Events</h2>
            <Link to="/calendar" className="text-primary hover:underline flex items-center">
              <span>View Calendar</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-600">No upcoming events</h3>
              <p className="text-gray-500 mt-1">Check back later for new events</p>
            </div>
          )}
        </section>

        {/* Themes Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold font-heading">Explore Themes</h2>
            <Link to="/themes" className="text-primary hover:underline flex items-center">
              <span>View All Themes</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {themeEventCount.map(theme => (
              <ThemeCard key={theme.id} theme={theme} eventCount={theme.count} />
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
            <h3 className="font-heading font-semibold text-xl mb-2">Statistics</h3>
            <p className="text-gray-600 mb-4">
              View historical data and statistics about all themes and programs.
            </p>
            <Link to="/statistics">
              <Button variant="outline" className="border-pink-300 hover:bg-pink-100">
                View Statistics
              </Button>
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-heading font-semibold text-xl mb-2">My Registrations</h3>
            <p className="text-gray-600 mb-4">
              View your registered programs and manage your participation.
            </p>
            <Link to="/profile">
              <Button variant="outline" className="border-blue-300 hover:bg-blue-100">
                View Registrations
              </Button>
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <h3 className="font-heading font-semibold text-xl mb-2">Help & Support</h3>
            <p className="text-gray-600 mb-4">
              Need help? Contact the coordinators or view frequently asked questions.
            </p>
            <Link to="/help">
              <Button variant="outline" className="border-green-300 hover:bg-green-100">
                Get Help
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
