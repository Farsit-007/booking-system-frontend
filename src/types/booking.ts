export interface Booking {
  id: string;
  resource: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
  createdAt: string;
}

export interface BookingRequest {
  resource: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictingBookings?: Booking[];
  message?: string;
}

export type BookingStatus = "Past" | "Ongoing" | "Upcoming";

export const RESOURCES = [
  "Room A",
  "Room B",
  "Room C",
  "Room D",
  "Room E",
] as const;

export type Resource = (typeof RESOURCES)[number];
