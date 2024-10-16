import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./Routes/products.route.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json()); // middleware: allows us to work with JSON

app.use(cors());

// Routes for products
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // Catch-all route to serve the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(port, () => {
  connectDb();
  console.log(`App started at port: ${port}`);
});
