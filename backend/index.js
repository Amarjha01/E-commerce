import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import "dotenv/config";
import dbconnect from "./config/database/dbconnect.js";
import router from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4173/',
  // origin: process.env.FRONTEND_URL || `http://192.168.45.146:5173`, 
  
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use("/api", router);

dbconnect().then(() => {
  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
