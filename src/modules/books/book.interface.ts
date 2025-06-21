import { Document, Types } from "mongoose";

export const genreList = [
  "HISTORY",
  "FICTION",
  "BIOGRAPHY",
  "NON_FICTION",
  "SCIENCE",
  "FANTASY",
] as const;

export type GenreType = (typeof genreList)[number];

export interface IBook {
  title: string;
  author: string;
  genre: GenreType;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IBookDocument extends IBook, Document {
  _id: Types.ObjectId;
  updateAvailability: () => void;
}
