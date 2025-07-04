import { Request, Response } from "express";
import { Book } from "./book.model";
import { genreList, IBook } from "./book.interface";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const result: IBook = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      const value = error.keyValue?.[field];
      res.status(400).json({
        success: false,
        message: `A book with the same ${field} (${value}) already exists.`,
      });
    }

    res.status(400).json({
      success: false,
      message: "Book creation failed",
      error: error.message || error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
      page = "1",
    } = req.query;

    const query: any = {};
    if (filter) query.genre = filter;

    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = (currentPage - 1) * perPage;

    const [books, total] = await Promise.all([
      Book.find(query)
        .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
        .skip(skip)
        .limit(perPage),
      Book.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / perPage);

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta: {
        total,
        page: currentPage,
        limit: perPage,
        totalPages,
      },
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

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: err,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }
    Object.assign(book, req.body);

    if ("copies" in req.body) {
      book.updateAvailability();
    }
    await book.save();

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: err,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: err,
    });
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Genres retrieved successfully",
      data: genreList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve genres",
      error: err,
    });
  }
};
