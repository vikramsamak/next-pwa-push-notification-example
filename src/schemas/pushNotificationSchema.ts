import { z } from "zod";
export const pushNotificationSchema = z.object({
  title: z
    .string({
      required_error: "Notification title is required.",
    })
    .min(2, {
      message: "Notification title must be at least 4 characters.",
    }),
  body: z
    .string({
      required_error: "Notification body is required.",
    })
    .min(10, {
      message: "Notification body must be at least 10 characters.",
    }),
});
