import { Schema } from "mongoose";
import { IBookDocument } from "./book.interface";

export const addBookMiddlewares = (schema: Schema<IBookDocument>) => {
  schema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
  };

  schema.pre("save", function (next) {
    console.log(`Book "${this.title}" is saved...`);
    next();
  });
};
