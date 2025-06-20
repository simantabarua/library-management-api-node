import { Request, Response } from "express";
import { Book } from "../books/book.model";
import { Borrow } from "./borrow.model";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    console.log(req.body);
    const book = await Book.findById(bookId);
    console.log(book);
    if (!book) {
      res.status(400).json({
        success: false,
        message: "Book not Found",
      });
      return;
    }

    if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
      return;
    }

    book.copies -= quantity;
    book.updateAvailability();
    await book.save();

    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Borrow failed",
      error: err,
    });
  }
};

export const getBorrowedSummary = async () => {};
