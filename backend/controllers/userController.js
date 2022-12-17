import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import cont from "../models/contactModel.js"
import bcrypt from 'bcryptjs'
import { Parser } from 'json2csv'
import fs from 'fs'


// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const use = await User.findOne({ email });
//   console.log();

//   password=User.matchPassword(password))
  if (use && (await bcrypt.compare(password, use.password))) {
    res.json({
      _id: use._id,
      name: use.name,
      email: use.email,
      isAdmin: use.isAdmin,
      token: generateToken(use._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   Post /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const use = await User.create({
    name,
    email,
    password,
  });

  if (use) {
    res
      .status(201)
      .json({
        _id: use._id,
        name: use.name,
        email: use.email,
        isAdmin: use.isAdmin,
        token: generateToken(use._id),
      });
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

// @desc    Auth user profile
// @route   Post /api/users/profile
// @access  private

const contact = asyncHandler(async (req, res) => {
  const { name, email, phone, message} = req.body;
   const myData=(req.body);
   console.log(myData);
   const fields = ['name', 'email', 'phone','message'];
   const opts = { fields };
   try {
    const parser = new Parser(opts);
    const csv = parser.parse(myData);
    fs.writeFile("Data1.csv",csv,function (error) {
      if(error) throw error;
      console.log("Wrote Successfully!!");
    })
    console.log(csv);
  } catch (err) {
    console.error(err);
  }

  const use = await cont.create({
    name,
    email,
    phone,
    linkedin
  });

  try {
    res
    .status(201)
    .json({
        _id: use._id,
        name:use.name,
        email:use.email,
        phone:use.phone,
        linkedin:use.linkedin
    })
  } catch (error) {
        console.log(error);
        res.status(404);
  }

//   const use = await User.findById(req.user._id);
//   res.json({
//     _id: use._id,
//     name: use.name,
//     email: use.email,
//     isAdmin: use.isAdmin,
//   });
});


export { authUser, registerUser, contact };
