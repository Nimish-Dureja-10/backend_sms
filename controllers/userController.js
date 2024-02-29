import { comparePassword, hashedPassword } from "../helper/authHelper.js";
import { User } from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { passwordStrength } from 'check-password-strength';

const check = (res) => {
  return res.status(400).json({
    success: false,
    message: "Some fields are still empty",
  });
};

export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    check(res);
    return;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Already Regsitered",
    });
  }

  if(!passwordStrength(password).contains.includes('lowercase') || 
   !passwordStrength(password).contains.includes('uppercase') || 
   !passwordStrength(password).contains.includes('number') || 
   !passwordStrength(password).contains.includes('symbol')){
    console.log(passwordStrength(password).length);
  res.status(422).json({
    success: false,
    message: "Password is weak"
  });
  return;
}


  const hashPassword = await hashedPassword(password);
  const user = await User.create({
    name: name,
    email: email,
    password: hashPassword,
  });
  res.status(201).json({
    success: true,
    message: "Sucessfully Registered",
    user,
  });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      check(res);
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = await JWT.sign(
      { _id: user._id },
      "PNP",
      { expiresIn: "5d" }
    );
      res.status(201).json({
      success: true,
      message: "Login Successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
