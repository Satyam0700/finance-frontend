import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  category: z.enum(["Food", "Transport", "Shopping", "Bills", "Other"]),
  description: z.string().min(3, "Description must be at least 3 characters"),
});