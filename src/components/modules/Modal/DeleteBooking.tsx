/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBooking } from "@/Services/Booking";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

type BookingStatus = "Upcoming" | "Ongoing" | "Past";

const DeleteModal = ({ id, status }: { id: string; status: BookingStatus }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (id) {
        const res = await deleteBooking(id);
        if (res.success) {
          toast.success(
            status === "Upcoming"
              ? "Booking cancelled successfully"
              : "Booking deleted successfully"
          );
          setOpen(false); 
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
      toast.error("Failed to process your request");
    }
  };

  const actionText = status === "Upcoming" ? "Cancel Booking" : "Delete Record";
  const confirmationText =
    status === "Upcoming"
      ? "cancel this upcoming booking"
      : "delete this booking record";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-red-500 border-red-300 hover:bg-red-50 cursor-pointer hover:text-red-600"
          variant="secondary"
          size="sm"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {actionText}
        </Button>
      </DialogTrigger>

      <DialogContent className="border-red-100 bg-gradient-to-br from-white to-red-50 rounded-xl shadow-2xl max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-3 bg-red-100 rounded-full animate-pulse">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>

            <DialogTitle className="text-xl font-semibold text-gray-900">
              Confirm {actionText}
            </DialogTitle>

            <DialogDescription className="text-gray-600">
              Are you sure you want to {confirmationText}?<br />
              {status === "Upcoming" ? (
                <>This will free up the time slot for others.</>
              ) : (
                <>This action cannot be undone.</>
              )}
            </DialogDescription>

            <div className="w-full border-t pt-4 flex justify-center gap-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Go Back
                </Button>
              </DialogClose>

              <Button
                variant="destructive"
                onClick={handleDelete}
                className="gap-2 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
                {actionText}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
