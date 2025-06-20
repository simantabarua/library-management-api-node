import { z } from "zod";
import { genreList } from "./book.interface";
export const createBookSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    author: z.string({ required_error: "Author is required" }),
    genre: z.enum(genreList, {
      errorMap: () => ({ message: "Invalid genre" }),
    }),
    isbn: z.string({ required_error: "ISBN is required" }),
    description: z.string().optional(),
    copies: z
      .number()
      .int()
      .nonnegative({ message: "Copies must be 0 or greater" }),
    available: z.boolean().optional(),
  }),
});
