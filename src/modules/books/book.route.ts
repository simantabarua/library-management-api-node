import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBookSchema, updateBookSchema } from "./book.validation";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
  getGenres,
} from "./book.controller";
export const bookRoutes = express.Router();

bookRoutes.post("/", validateRequest(createBookSchema), createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/genres", getGenres);
bookRoutes.get("/:bookId", getBookById);
bookRoutes.put("/:bookId", validateRequest(updateBookSchema), updateBook);
bookRoutes.delete("/:bookId", deleteBook);
