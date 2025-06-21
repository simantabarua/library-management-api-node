import { model, Schema } from "mongoose";
import { genreList, IBookDocument } from "./book.interface";
import { addBookMiddlewares } from "./book.middleware";

const bookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: genreList },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

addBookMiddlewares(bookSchema);

export const Book = model<IBookDocument>("Book", bookSchema);
