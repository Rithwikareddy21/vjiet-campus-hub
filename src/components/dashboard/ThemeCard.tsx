
import { Link } from "react-router-dom";
import { Theme } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, GraduationCap, Play, Award, Star } from "lucide-react";

interface ThemeCardProps {
  theme: Theme;
  eventCount?: number;
}

export const ThemeCard = ({ theme, eventCount = 0 }: ThemeCardProps) => {
  const getIcon = () => {
    switch (theme.id) {
      case "inspirational":
        return <Bookmark className={`h-6 w-6 ${theme.color}`} />;
      case "skills":
        return <GraduationCap className={`h-6 w-6 ${theme.color}`} />;
      case "ted":
        return <Play className={`h-6 w-6 ${theme.color}`} />;
      case "entrepreneur":
        return <Award className={`h-6 w-6 ${theme.color}`} />;
      case "differentiators":
        return <Star className={`h-6 w-6 ${theme.color}`} />;
      default:
        return <Bookmark className={`h-6 w-6 ${theme.color}`} />;
    }
  };

  return (
    <Card className={`card-hover border overflow-hidden ${theme.bgClass}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          {getIcon()}
          <Badge variant="outline">{eventCount} Events</Badge>
        </div>
        <CardTitle className="font-heading pt-2">{theme.name}</CardTitle>
        <CardDescription>{theme.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-24 overflow-hidden text-sm text-gray-600">
          <p>Explore programs related to {theme.name.toLowerCase()} theme.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/themes/${theme.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Programs
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
