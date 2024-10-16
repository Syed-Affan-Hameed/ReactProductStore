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

// CORS settings to allow both local and deployed frontend applications to access the backend
const allowedOrigins = [
  "https://reactproductstore.onrender.com", // Deployed app
  "http://localhost:5173"  // Local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  credentials: true,  // Allow credentials (cookies, etc.) if necessary
  allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));

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
