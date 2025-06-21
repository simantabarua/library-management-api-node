import { Schema, model } from "mongoose";
import { IBorrowDocument } from "./borrow.interface";
import { addBorrowMiddlewares } from "./borrow.middleware";

const borrowSchema = new Schema<IBorrowDocument>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

addBorrowMiddlewares(borrowSchema);

export const Borrow = model<IBorrowDocument>("Borrow", borrowSchema);
