
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { themes, events } from "@/lib/data";
import { EventCard } from "@/components/dashboard/EventCard";
import { Button } from "@/components/ui/button";
import { Bookmark, GraduationCap, Play, Award, Star, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeDetailPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  
  // Find the theme
  const theme = themes.find((t) => t.id === themeId);
  
  // Filter events by theme
  const themeEvents = events.filter((event) => event.theme === themeId);
  
  // If theme not found
  if (!theme) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold font-heading mb-4">Theme Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, the theme you are looking for does not exist.
          </p>
          <Link to="/themes">
            <Button>View All Themes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Get icon for theme
  const getIcon = () => {
    switch (theme.id) {
      case "inspirational":
        return <Bookmark className={`h-8 w-8 ${theme.color}`} />;
      case "skills":
        return <GraduationCap className={`h-8 w-8 ${theme.color}`} />;
      case "ted":
        return <Play className={`h-8 w-8 ${theme.color}`} />;
      case "entrepreneur":
        return <Award className={`h-8 w-8 ${theme.color}`} />;
      case "differentiators":
        return <Star className={`h-8 w-8 ${theme.color}`} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Link to="/themes" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to All Themes
        </Link>
        
        <div className={cn("p-6 rounded-lg border", theme.bgClass)}>
          <div className="flex items-center space-x-4 mb-4">
            {getIcon()}
            <h1 className="text-3xl font-bold font-heading">{theme.name}</h1>
          </div>
          
          <p className="text-gray-700 mb-6">
            {theme.description}
          </p>
          
          <div className="bg-white bg-opacity-70 p-4 rounded-md">
            <h2 className="text-xl font-semibold font-heading mb-2">About This Theme</h2>
            <p className="text-gray-600">
              {theme.name} is designed to help students develop essential skills and knowledge in this area. 
              Participate in these programs to enhance your understanding and practical abilities.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-heading mb-4">Programs in {theme.name}</h2>
          
          {themeEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themeEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <h3 className="text-lg font-medium text-gray-600">No programs available</h3>
              <p className="text-gray-500 mt-1">Check back later for new programs</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ThemeDetailPage;
