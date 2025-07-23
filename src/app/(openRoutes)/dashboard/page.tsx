import { BookingCard } from "@/components/modules/BookingDashboard/BookingCard";
import BookingFilter from "@/components/modules/BookingDashboard/BookingFilter";
import { getAllBookings } from "@/Services/Booking";
import { Booking } from "@/types/booking";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data: bookings } = await getAllBookings(query);

  return (
    <div className="px-5">
      <BookingFilter/>
      <div className="flex-1 grid  lg:grid-cols-3 gap-5 lg:gap-10 md:grid-cols-2 justify-center items-center">
        {bookings?.map((book: Booking, idx: string) => (
          <BookingCard key={idx} booking={book} />
        ))}
      </div>
    </div>
  );
};

export default page;
