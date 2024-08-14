import mongoose from "mongoose";

async function dbconnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true
    });
    console.log("Database connected successfully!");
  } catch (err) {
    console.log("Error connecting to the database:", err);
  }
}

export default dbconnect;
