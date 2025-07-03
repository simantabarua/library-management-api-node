import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const borrow = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (err: any) {
    
    res.status(400).json({
      success: false,
      message: "Borrow failed",
      error: err.message || err,
    });
  }
};

export const getBorrowedSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get borrowed summary",
      error: err,
    });
  }
};
