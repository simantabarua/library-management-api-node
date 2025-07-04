import { Document, Types } from "mongoose";

export const genreList = [
  "HISTORY",
  "FICTION",
  "BIOGRAPHY",
  "NON_FICTION",
  "SCIENCE",
  "FANTASY",
  "MYSTERY",
  "ROMANCE",
  "THRILLER",
  "HORROR",
  "SELF_HELP",
  "POETRY",
  "DRAMA",
  "ADVENTURE",
  "COMICS",
  "TECHNOLOGY",
  "PHILOSOPHY",
  "RELIGION",
  "ART",
  "TRAVEL"
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
