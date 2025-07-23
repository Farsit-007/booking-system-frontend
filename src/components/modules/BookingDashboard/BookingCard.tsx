"use client";

import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/booking";
import { Clock, User, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteModal from "../Modal/DeleteBooking";

type BookingStatus = "Upcoming" | "Ongoing" | "Past";

type Props = {
  booking: Booking;
};

function getBookingStatus(booking: Booking): BookingStatus {
  const now = new Date();
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  if (now < start) return "Upcoming";
  if (now > end) return "Past";
  return "Ongoing";
}

function formatDateTimeRange(startTime: string, endTime: string): string {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    timeZone: "Asia/Dhaka"
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka"
  };

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime())) return "Invalid start time";
  if (isNaN(end.getTime())) return "Invalid end time";

  const dateLabel = start.toLocaleDateString("en-US", dateOptions);
  const startTimeLabel = start.toLocaleTimeString("en-US", timeOptions);
  const endTimeLabel = end.toLocaleTimeString("en-US", timeOptions);

  return `${dateLabel} • ${startTimeLabel} - ${endTimeLabel}`;
}

function formatDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Invalid duration";

  const durationMs = end.getTime() - start.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function getStatusColor(status: BookingStatus) {
  switch (status) {
    case "Upcoming":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Ongoing":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Past":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}

function getCardBorder(status: BookingStatus) {
  switch (status) {
    case "Upcoming":
      return "border-l-blue-500";
    case "Ongoing":
      return "border-l-green-500";
    case "Past":
      return "border-l-gray-500";
    default:
      return "border-l-gray-500";
  }
}

export function BookingCard({ booking }: Props) {
  const status = getBookingStatus(booking);

  return (
    <div
      className={cn(
        "flex flex-col p-0 border rounded-lg shadow-sm bg-white overflow-hidden border-l-4",
        getCardBorder(status)
      )}
    >
      <div className="flex items-start justify-between p-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <Badge className={cn(getStatusColor(status), "transition-colors")}>
              {status}
            </Badge>
           
              
            
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">{booking.resource}</h3>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4 flex-shrink-0" />
              <span>{booking.requestedBy}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="h-4 w-4 flex-shrink-0" />
              <span>
                {formatDateTimeRange(booking.startTime, booking.endTime)}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  Duration: {formatDuration(booking.startTime, booking.endTime)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-2 border-t flex justify-end">
        <DeleteModal id={booking.id} status={status}/>
      </div>
    </div>
  );
}
