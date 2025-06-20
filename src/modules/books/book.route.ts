import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBookSchema } from "./book.validation";
import { createBook } from "./book.controller";
export const bookRoutes = express.Router();


bookRoutes.post('/', validateRequest(createBookSchema), createBook);
// bookRoutes.get('/', getAllBooks);
// bookRoutes.get('/:bookId', getBookById);
// bookRoutes.put('/:bookId', validateRequest(updateBookSchema), updateBook);
// bookRoutes.delete('/:bookId', deleteBook);