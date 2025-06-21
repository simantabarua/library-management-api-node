import { Schema } from "mongoose";
import { IBookDocument } from "./book.interface";

export const addBookMiddlewares = (schema: Schema<IBookDocument>) => {
  schema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
  };

  schema.pre("save", function (next) {
    this.updateAvailability();
    next();
  });

  schema.pre("findOneAndDelete", async function (next) {
    const book = await this.model.findOne(this.getFilter());
    if (!book) {
      return next(new Error("Book not found."));
    }
    next();
  });
  schema.post("save", function (doc) {
    console.log(`Book saved successfully.`);
  });
};
