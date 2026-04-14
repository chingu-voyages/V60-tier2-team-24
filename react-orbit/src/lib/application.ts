import { APPLICATION_STATUSES } from "@/constants/applicationStatus";
import { z } from "zod";


const statusValues = Object.values(APPLICATION_STATUSES)as [string, ...string[] ];

export const applicationSchema = z.object({
  CompanyName: z.string().min(1, "Company name is required"),
  Role: z.string().min(1, "Role is required"),
  DateApplied: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  Location: z.string().min(1, "Location is required"),
  Status: z.enum(statusValues, {
    message: "Status is required",
  }),
  JobLink: z.string().url("Invalid URL format"),
  Notes: z.string().min(1, "Notes is required"),
});

export type Application = z.infer<typeof applicationSchema>;
