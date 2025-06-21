import { Schema } from "mongoose";
import { IBookDocument } from "../books/book.interface";
import { IBorrowDocument } from "./borrow.interface";
import { Book } from "../books/book.model";

export const addBorrowMiddlewares = (schema: Schema<IBorrowDocument>) => {
  schema.pre("save", async function (next) {
    try {
      const borrow = this;

      const book: IBookDocument | null = await Book.findById(borrow.book);
      if (!book) {
        return next(new Error("Book not found"));
      }

      if (book.copies < borrow.quantity) {
        return next(new Error("Not enough copies available"));
      }

      book.copies -= borrow.quantity;
      book.updateAvailability();
      await book.save();

      next();
    } catch (error) {
      next(error as Error);
    }
  });

  schema.post("save", function (doc) {
    console.log(`Borrow record created.`);
  });
};
