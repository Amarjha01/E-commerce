import usermodel from "../models/usermodel.js";
import bcrypt from "bcryptjs";

async function usersignupcontroller(req, res) {
  try {
    const { email, password, name } = req.body;
    console.log("req.body", req.body);
    if (!email || !password || !name) {
      return res.json({
        message: "Please fill all the fields",
        error: true,
        success: false,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(password, salt);

    if (!hashpassword) {
      console.log("Password not hashed");
    }

    const payload = {
      ...req.body,
      role : 'GENERAL',
      password: hashpassword,
    };

    const userData = new usermodel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

export default usersignupcontroller;
