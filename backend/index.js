import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import "dotenv/config";
import dbconnect from "./config/database/dbconnect.js";
import router from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2, process.env.FRONTEND_URL3];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
console.log(process.env.FRONTEND_URL, process.env.FRONTEND_URL2)
app.use(express.json());
app.use(cookieParser())

app.use("/api", router);

dbconnect().then(() => {
  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
