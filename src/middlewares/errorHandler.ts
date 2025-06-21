import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: err.errors,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: err instanceof Error ? err.message : "Something went wrong",
  });
};
