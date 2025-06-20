import { Document } from "mongoose";

export const genreList = [
  "HISTORY",
  "FICTION",
  "BIOGRAPHY",
  "NON_FICTION",
  "SCIENCE",
  "FANTASY",
] as const;

export type GenreType = (typeof genreList)[number];

export interface IBook extends Document {
  title: string;
  author: string;
  genre: GenreType;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  updateAvailability(): void;
}
