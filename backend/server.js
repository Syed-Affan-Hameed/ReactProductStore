import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./Routes/products.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json()); // middleware: allows us to work with json
// cors settings to allow frontend application to hit the backend server.
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.options('*', cors());  // Allow preflight for all routes

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use('/api/products',productRoutes);

// Starts the Server
app.listen(port, () => {
  connectDb();
  console.log(`app started at port : ${port}`);
});
