
import { Event, Theme, ThemeStatistics, User, Venue } from "./types";
import { addDays, differenceInCalendarDays } from "date-fns";

// Venues
export const venues: Venue[] = [
  {
    name: "KS Auditorium",
    location: "C Block",
    capacity: 500
  },
  {
    name: "Seminar Hall",
    location: "B Block",
    capacity: 200
  },
  {
    name: "APJ Auditorium",
    location: "D Block",
    capacity: 350
  },
  {
    name: "PEB Seminar Hall",
    location: "PEB Block",
    capacity: 150
  }
];

// Themes
export const themes: Theme[] = [
  {
    id: "inspirational",
    name: "Inspirational Talk",
    description: "Inspiring talks from industry leaders and motivational speakers to guide students on their career path.",
    color: "text-pink-600",
    bgClass: "theme-card-1",
    icon: "bookmark"
  },
  {
    id: "skills",
    name: "Skills and Euphoria",
    description: "Workshops and sessions focused on developing technical and soft skills essential for career growth.",
    color: "text-blue-600",
    bgClass: "theme-card-2",
    icon: "graduation-cap"
  },
  {
    id: "ted",
    name: "TED Videos",
    description: "Curated TED talks followed by discussions to broaden perspectives and inspire innovation.",
    color: "text-orange-600",
    bgClass: "theme-card-3",
    icon: "play"
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur in You",
    description: "Programs designed to nurture entrepreneurial mindset and provide insights into starting ventures.",
    color: "text-purple-600",
    bgClass: "theme-card-4",
    icon: "award"
  },
  {
    id: "differentiators",
    name: "VNR Differentiators",
    description: "Unique programs and initiatives that set VNR VJIET graduates apart in the professional world.",
    color: "text-green-600",
    bgClass: "theme-card-5",
    icon: "star"
  }
];

// Calculate days left until event
const calculateDaysLeft = (dateString: string): number => {
  const eventDate = new Date(dateString);
  const today = new Date();
  return differenceInCalendarDays(eventDate, today);
};

// Event images
const eventImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", // tech/laptop
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // programming
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // person with laptop
  "https://images.unsplash.com/photo-1518770660439-4636190af475", // circuit board
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", // code matrix
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // woman with laptop
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", // robot
];

// Generate events with proper status and days left
const generateEvents = (): Event[] => {
  const today = new Date();
  const events: Event[] = [
    {
      id: "1",
      title: "Leadership in Technology",
      theme: "inspirational",
      description: "A talk by industry leaders on how to develop leadership skills in the technology sector.",
      venue: venues[0],
      date: addDays(today, 15).toISOString().split('T')[0],
      startTime: "10:30",
      endTime: "12:30",
      speaker: "Dr. Rajesh Kumar, CTO of Tech Innovations",
      allowedSections: ["CSE-A", "CSE-B", "CSE-C", "CSE-D", "CSBS"],
      maxSeats: 450,
      registrationOpen: true,
      imageUrl: eventImages[0],
      gadgetRequirements: "Laptop (optional)",
      coordinators: ["Prof. Anand Sharma", "Prof. Lakshmi Devi"],
      status: "upcoming",
      daysLeft: 15
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      theme: "skills",
      description: "Intensive hands-on workshop on modern web development technologies and frameworks.",
      venue: venues[1],
      date: addDays(today, 7).toISOString().split('T')[0],
      startTime: "10:00",
      endTime: "13:00",
      speaker: "Ms. Priya Patel, Senior Developer at WebTech Solutions",
      allowedSections: ["CSE-A", "CSE-B"],
      maxSeats: 150,
      registrationOpen: true,
      imageUrl: eventImages[1],
      gadgetRequirements: "Laptop with Node.js installed",
      coordinators: ["Prof. Vivek Reddy", "Prof. Suman Rao"],
      status: "upcoming",
      daysLeft: 7
    },
    {
      id: "3",
      title: "AI Revolution - TED Talk Screening",
      theme: "ted",
      description: "Screening of selected TED talks on AI advancements followed by panel discussion.",
      venue: venues[2],
      date: addDays(today, 3).toISOString().split('T')[0],
      startTime: "14:00",
      endTime: "16:30",
      speaker: "Curated by Prof. Srinivas Rao",
      allowedSections: ["CSE-C", "CSE-D", "CSBS"],
      maxSeats: 300,
      registrationOpen: true,
      imageUrl: eventImages[2],
      coordinators: ["Prof. Kiran Kumar", "Prof. Divya Reddy"],
      status: "upcoming",
      daysLeft: 3
    },
    {
      id: "4",
      title: "Startup Success Stories",
      theme: "entrepreneur",
      description: "Successful entrepreneurs share their journey, challenges, and insights.",
      venue: venues[0],
      date: addDays(today, 10).toISOString().split('T')[0],
      startTime: "11:00",
      endTime: "13:00",
      speaker: "Mr. Vikram Joshi, Founder of EduTech Innovations",
      allowedSections: ["CSE-A", "CSE-B", "CSE-C", "CSE-D", "CSBS"],
      maxSeats: 450,
      registrationOpen: true,
      imageUrl: eventImages[3],
      coordinators: ["Prof. Mahesh Kumar", "Prof. Sreelatha"],
      status: "upcoming",
      daysLeft: 10
    },
    {
      id: "5",
      title: "Industry-Ready Projects Workshop",
      theme: "differentiators",
      description: "Hands-on session on developing industry-standard projects to enhance your portfolio.",
      venue: venues[3],
      date: addDays(today, 5).toISOString().split('T')[0],
      startTime: "10:00",
      endTime: "12:00",
      speaker: "Dr. Anil Kumar, Industry Consultant",
      allowedSections: ["CSE-D", "CSBS"],
      maxSeats: 120,
      registrationOpen: true,
      imageUrl: eventImages[4],
      gadgetRequirements: "Laptop with required software installed",
      coordinators: ["Prof. Rajendra Prasad", "Prof. Kavitha"],
      status: "upcoming",
      daysLeft: 5
    },
    {
      id: "6",
      title: "Growth Mindset Development",
      theme: "inspirational",
      description: "Interactive session on developing a growth mindset for personal and professional success.",
      venue: venues[1],
      date: addDays(today, -2).toISOString().split('T')[0],
      startTime: "11:30",
      endTime: "13:30",
      speaker: "Dr. Meena Sharma, Psychology Expert",
      allowedSections: ["CSE-A", "CSE-B", "CSE-C"],
      maxSeats: 180,
      registrationOpen: false,
      imageUrl: eventImages[5],
      coordinators: ["Prof. Suresh Babu", "Prof. Rama Devi"],
      status: "completed",
      daysLeft: -2
    }
  ];
  
  return events;
};

export const events: Event[] = generateEvents();

// Statistics data
export const themeStatistics: ThemeStatistics[] = [
  {
    year: "2017-18",
    theme1: 4,
    theme2: 5,
    theme3: 5,
    theme4: 3,
    theme5: 5,
    total: 22
  },
  {
    year: "2018-19",
    theme1: 2,
    theme2: 1,
    theme3: 1,
    theme4: 1,
    theme5: 1,
    total: 6
  },
  {
    year: "2019-20",
    theme1: 4,
    theme2: 3,
    theme3: 1,
    theme4: 0,
    theme5: 0,
    total: 8
  },
  {
    year: "2020-21",
    theme1: 4,
    theme2: 2,
    theme3: 4,
    theme4: 3,
    theme5: 1,
    total: 14
  },
  {
    year: "2021-22",
    theme1: 5,
    theme2: 5,
    theme3: 3,
    theme4: 4,
    theme5: 4,
    total: 21
  },
  {
    year: "2022-23",
    theme1: 2,
    theme2: 1,
    theme3: 2,
    theme4: 1,
    theme5: 4,
    total: 10
  }
];

// Mock user
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@vnrvjiet.in",
    role: "student",
    section: "CSE-A",
    department: "Computer Science"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@vnrvjiet.in",
    role: "faculty",
    department: "Computer Science"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@vnrvjiet.in",
    role: "admin",
    department: "Administration"
  }
];
