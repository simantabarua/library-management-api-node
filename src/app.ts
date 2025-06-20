import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { bookRoutes } from "./modules/books/book.route";

export const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: {
      path: req.originalUrl,
    },
  });
});
app.use(errorHandler);
