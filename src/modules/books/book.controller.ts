import { Request, Response } from "express";
import { Book } from "./bood.model";
import { IBook } from "./book.interface";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const result: IBook = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Book creation failed",
      error,
    });
  }
};

