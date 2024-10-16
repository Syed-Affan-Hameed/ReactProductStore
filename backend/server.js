import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./Routes/products.route.js";
import cors from "cors";
import path from 'path';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const __dirname =path.resolve();
app.use(express.json()); // middleware: allows us to work with json
// cors settings to allow frontend application to hit the backend server.
const allowedOrigins = ['http://localhost:5173', 'https://reactproductstore.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the incoming request origin is in the allowedOrigins array
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.options('*', cors());  // Allow preflight for all routes
//for all the routes starting with '/api/products' we are sending it to productRoutes
app.use('/api/products',productRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")));
  // for any other route other than backend ones.
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  })
}


// Starts the Server
app.listen(port, () => {
  connectDb();
  console.log(`app started at port : ${port}`);
});
