import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running still....");
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running at port ${port}`));
