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

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    // /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;
    const books: IBook[] = await Book.find(query)
      .sort({
        [sortBy as string]: sort === "desc" ? -1 : 1,
      })
      .limit(Number(limit));

    res.json({
      success: true,
      message: "Books retrieve successfully",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: err,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Book Not found",
      error: err,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Book Not found",
      error: err,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Book Not found",
      error: err,
    });
  }
};
