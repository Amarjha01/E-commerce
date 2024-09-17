import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import "dotenv/config";
import dbconnect from "./config/database/dbconnect.js";
import router from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://www.electramart.ninja',
  'https://electramart.ninja',
  
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

dbconnect().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
