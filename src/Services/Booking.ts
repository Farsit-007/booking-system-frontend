/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createBookings = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    revalidateTag("BOOK");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllBookings = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();
  if (query?.resource) {
    params.append("resource", query?.resource as string);
  }
  if (query?.date) {
    params.append("date", query.date as string);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["BOOK"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};



export const deleteBooking = async (id: string) => {
    console.log(id);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/${id}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("BOOK");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};


export const getAvailableBookings = async(query?: {
  date?: string;
}) => {
 
  const params = new URLSearchParams();
  if (query?.date) {
    params.append("date", query?.date as string);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/available-slots?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["BOOK"],
        },
      }
    );
    const data = await res.json();
  
    return data;
  } catch (error: any) {
    return Error(error);
  }
};