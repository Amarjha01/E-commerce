import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    role: String,
  },

  {
    timestamps: true,
  }
);

const usermodel = mongoose.model("user", userSchema);

export default usermodel;
