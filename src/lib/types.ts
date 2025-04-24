
export type UserRole = "student" | "faculty" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  section?: string;
  department?: string;
}

export type ThemeType = "inspirational" | "skills" | "ted" | "entrepreneur" | "differentiators";

export interface Event {
  id: string;
  title: string;
  theme: ThemeType;
  description: string;
  venue: Venue;
  date: string;
  startTime: string;
  endTime: string;
  speaker: string;
  allowedSections: string[];
  maxSeats: number;
  registrationOpen: boolean;
  imageUrl: string;
  gadgetRequirements?: string;
  coordinators: string[];
  registeredStudents?: string[];
  status: "upcoming" | "ongoing" | "completed";
  daysLeft?: number;
}

export interface Venue {
  name: string;
  location: string;
  capacity: number;
}

export interface ThemeStatistics {
  year: string;
  theme1: number;
  theme2: number;
  theme3: number;
  theme4: number;
  theme5: number;
  total: number;
}

export interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  color: string;
  bgClass: string;
  icon: string;
}
