import express, { Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./modules/books/book.route";
import { borrowRoutes } from "./modules/borrow/borrow.route";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is Running ",
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: {
      path: req.originalUrl,
    },
  });
});

app.use(errorHandler);
