
import { Link } from "react-router-dom";
import { Event } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
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

  const getThemeClass = () => {
    switch (event.theme) {
      case "inspirational":
        return "theme-card-1";
      case "skills":
        return "theme-card-2";
      case "ted":
        return "theme-card-3";
      case "entrepreneur":
        return "theme-card-4";
      case "differentiators":
        return "theme-card-5";
      default:
        return "theme-card-1";
    }
  };

  // Default fallback image if the event image URL is empty or invalid
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";

  return (
    <div className={cn("rounded-lg overflow-hidden shadow-md border card-hover", getThemeClass())}>
      <div className="h-40 overflow-hidden">
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
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-semibold text-lg">{event.title}</h3>
          <Badge className={getStatusColor()}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>
              {event.venue.name}, {event.venue.location}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>
              Max Seats: {event.maxSeats}
            </span>
          </div>
        </div>
        
        {event.status === "upcoming" && (
          <div className="text-sm font-medium mb-3 text-primary">
            {event.daysLeft} days left to register
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <Badge variant="outline">
            {event.theme.charAt(0).toUpperCase() + event.theme.slice(1)}
          </Badge>
          <Link to={`/events/${event.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
