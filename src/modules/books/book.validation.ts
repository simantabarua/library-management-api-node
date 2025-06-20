import { z } from "zod";
import { genreList } from "./book.interface";

export const createBookSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.enum(genreList),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.number().int().nonnegative(),
    available: z.boolean().optional(),
  }),
});

export const updateBookSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.enum(genreList).optional(),
    isbn: z.string().optional(),
    description: z.string().optional(),
    copies: z.number().int().nonnegative().optional(),
    available: z.boolean().optional(),
  }),
});
