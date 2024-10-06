import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./Routes/products.route.js"


dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json()); // allows us to work with json

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use('/api/products',productRoutes);

// Starts the Server
app.listen(port, () => {
  connectDb();
  console.log(`app started at port : ${port}`);
});
