import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler: any = (
  err: unknown,
  req: Request,
  res: Response
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: err.errors,
    });
  }

  res.status(500).json({
    success: false,
    message: err instanceof Error ? err.message : "Something went wrong",
  });
};
