import { z } from "zod";
export const bookingSchema = z.object({
  resource: z.string().min(1, "Resource is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  requestedBy: z.string().min(2, "Your name is required"),
});
