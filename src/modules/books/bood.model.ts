import { model, Schema } from "mongoose";
import { genreList, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, require: true },
    author: { type: String, require: true },
    genre: { type: String, require: true, enum: genreList },
    isbn: { type: String, require: true },
    description: { type: String },
    copies: { type: Number, require: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);
