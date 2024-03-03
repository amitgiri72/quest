import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import Users from '../models/auth.js'
import LoginHistory from "../models/loginHistory.js";

export const signUpController = async (req, res) => {
  const { name, email, password,answer } = req.body
  try {
    const existingUser = await Users.findOne({ email })
    if (existingUser) {
      return res.status(404).json({
        message: "User already exists."
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await Users.create({
      name, email, password: hashedPassword, answer
    })
    const token = jwt.sign({
      email: newUser.email,
      id: newUser._id
    },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    )

    res.status(200).json({
      result: newUser, token
    })
} catch (error) {
  res.status(500).json("Something went wrong...")
}
}


export const logInController = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await Users.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn't exists"
      })}

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

      if (!isPasswordCorrect) {
        return res.status(404).json({
          message: "Invalid Credentials"
        })
      }

      const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id
      },
      process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      const loginHistory = new LoginHistory({
        userId: existingUser._id,
        ipAddress: req.ip,
        systemInfo: req.get("User-Agent"),
      });
      await loginHistory.save();

    res.status(200).json({
     result:existingUser, token
    })
  } catch (error) {
    res.status(500).json("Something went wrong...")
  }
}

//forgot passwordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required!" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required!" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required!" });
    }

    //check
    const user = await Users.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    // const hashed = await hashPassword(newPassword);
    const hashed = await bcrypt.hash(newPassword, 10)
    await Users.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};