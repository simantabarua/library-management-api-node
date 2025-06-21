import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBorrowSchema } from "./borrow.validation";
import { createBorrow, getBorrowedSummary } from "./borrow.controller";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", validateRequest(createBorrowSchema), createBorrow);
borrowRoutes.get("/", getBorrowedSummary);
