/**
 * Mock Data for CleanTrack
 * This file contains dummy data used throughout the application.
 * In a real app, this would come from a backend API.
 */

// Type definitions for our data
export interface Report {
  id: number;
  image: string;
  description: string;
  location: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  rewardPoints: number;
}

export interface User {
  name: string;
  email: string;
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
  rewardPoints: number;
}

// Dummy user data
export const mockUser: User = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  totalReports: 8,
  pendingReports: 3,
  resolvedReports: 4,
  rewardPoints: 120,
};

// Dummy reports data
export const mockReports: Report[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=300&fit=crop",
    description: "Garbage dumped near the river bank causing water pollution.",
    location: "Yamuna Bank, Delhi",
    date: "2026-02-20",
    status: "Approved",
    rewardPoints: 20,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop",
    description: "Industrial waste being released into the open drain.",
    location: "Industrial Area, Kanpur",
    date: "2026-02-22",
    status: "Pending",
    rewardPoints: 0,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=300&fit=crop",
    description: "Air pollution from factory chimneys in residential area.",
    location: "Sector 5, Noida",
    date: "2026-02-25",
    status: "Pending",
    rewardPoints: 0,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    description: "Plastic waste scattered across the beach shore.",
    location: "Juhu Beach, Mumbai",
    date: "2026-02-18",
    status: "Approved",
    rewardPoints: 25,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=300&fit=crop",
    description: "Construction debris blocking the public drainage system.",
    location: "MG Road, Bangalore",
    date: "2026-02-15",
    status: "Rejected",
    rewardPoints: 0,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?w=400&h=300&fit=crop",
    description: "Burning of waste in open ground near school.",
    location: "Civil Lines, Lucknow",
    date: "2026-02-27",
    status: "Pending",
    rewardPoints: 0,
  },
];
