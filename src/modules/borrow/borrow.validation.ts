import { z } from "zod";

export const createBorrowSchema = z.object({
  body: z.object({
    book: z.string({ required_error: "Book ID is required" }),
    quantity: z
      .number()
      .int()
      .positive({ message: "Must borrow at least 1 copy" }),
    dueDate: z.string({ required_error: "Due date is required" }),
  }),
});
