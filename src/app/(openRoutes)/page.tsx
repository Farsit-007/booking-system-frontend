
import { BookingCalendar } from "@/components/modules/BookingDashboard/Calender";
import { BookingForm } from "@/components/modules/BookingForm/BookingForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="  bg-gray-50 rounded-xl">
      <div className="p-6">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Resource Booking System
            <span className="block text-sm font-normal text-gray-600 mt-1">
              with Conflict Detection and Buffer Logic
            </span>
          </h1>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-black text-white rounded-lg  transition-colors shadow-sm"
          >
            Dashboard
          </Link>
        </div>


        <div className="flex flex-col md:flex-row gap-6">

          <div className="w-full ">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">New Booking</h2>
              <BookingForm />
            </div>
          </div>


          <div className="w-full">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Calendar</h2>
              <BookingCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}