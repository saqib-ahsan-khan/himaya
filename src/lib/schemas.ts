import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name").max(100),
  workEmail: z.string().email("Please enter a valid work email").min(5),
  phone: z.string().optional(),
  companyName: z.string().min(2, "Please enter your company name"),
  jobTitle: z.string().min(2, "Please enter your job title"),
  industry: z.string().min(1, "Please select your firm type"),
  employeeCount: z.string().min(1, "Please select company size"),
  mainConcern: z.string().min(10, "Please describe your main concern (minimum 10 characters)"),
  preferredDateTime: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to continue",
  }),
});

export const leadMagnetSchema = z.object({
  fullName: z.string().min(2, "Required"),
  workEmail: z.string().email("Valid work email required"),
  companyName: z.string().min(2, "Required"),
  role: z.string().min(2, "Required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Required to download",
  }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;
