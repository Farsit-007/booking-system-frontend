"use client";

import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getAvailableBookings } from "@/Services/Booking";

type Booking = {
  id: string;
  resource: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
};

export function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getAvailableBookings({
          date: date?.toLocaleDateString(),
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [date]);

  return (
    <div className="flex  flex-col md:flex-row items-center md:items-start justify-center gap-5">
      <div className="w-full ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm"
          captionLayout="dropdown"
          fromYear={2023}
          toYear={2025}
        />
      </div>

      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? format(date, "MMMM d, yyyy") : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-3">
                    <p>Booked Slot</p>
                    <div className="text-sm">
                      {format(parseISO(booking.startTime), "h:mm a")} -{" "}
                      {format(parseISO(booking.endTime), "h:mm a")}
                    </div>
                  </div>
                ))}
                <div className="text-center py-2 text-gray-500">
                  Other times are available for booking
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {date
                  ? "All times are available for booking"
                  : "Select a date to view availability"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}