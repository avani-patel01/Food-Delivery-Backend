import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { VandorModel } from "../models/VandorModel.js";

export const getVandor = async (req, res) => {
  try {
    const data = await VandorModel.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error in Sending Data");
  }
};

export const getVandorById = async (req, res) => {
  try {
    const data = await VandorModel.findById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error in Fetching the Data");
  }
};

export const createVandor = async (req, res) => {
  const {
    name,
    foodType,
    pincode,
    address,
    phone,
    ownerName,
    email,
    password,
    serviceavailable,
    coverImages,
    rating,
    foods,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const data = await VandorModel.create({
    name,
    foodType,
    pincode,
    address,
    phone,
    ownerName,
    email,
    password: hashPassword,
    serviceavailable,
    coverImages,
    rating,
    foods,
  });
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error in Saving Data");
  }
};

export const vandorLogin = async (req, res) => {
  try {
    const Vandor = req.Vandor;
    const token = jwt.sign(
      {
        id: Vandor._id,
        email: Vandor.email,
        name: Vandor.name,
        foodType: Vandor.foodType,
      },
      JWT_SECRET,
      { expiresIn: "100d" }
    );
    const data = {
      message: "Login Successfully",
      email: Vandor.email,
      token,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error in Login!");
  }
};

export const getVandorProfile = async (req, res) => {
  try {
    const vandor = req.Vandor;
    const data = await VandorModel.findById(vandor.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error in Fetching the Data");
  }
};

export const UpdateVandorProfile = async (req, res) => {
  const { name, address, phone, foodType, pincode } = req.body;
  const vandor = req.Vandor;
  const existVandor = await VandorModel.findById(vandor.id);

  if (!existVandor) {
    return res.status(400).json({ error: "Vandor not found" });
  }

  const files = req.files;
  const coverImages = files.map((file) => file.filename);

  existVandor.name = name;
  existVandor.address = address;
  existVandor.phone = phone;
  existVandor.foodType = foodType;
  existVandor.pincode = pincode;
  existVandor.coverImages = coverImages;

  await existVandor.save();
  try {
    res.status(200).json(existVandor);
  } catch (error) {
    res.status(500).json("Error in Fetching the Data");
  }
};

export const UpdateVandorService = async (req, res) => {
  const vandor = req.Vandor;
  const existVandor = await VandorModel.findById(vandor.id);

  if (!existVandor) {
    return res.status(400).json({ error: "Vandor not found" });
  }

  existVandor.serviceavailable = !existVandor.serviceavailable;

  await existVandor.save();
  try {
    res.status(200).json(existVandor);
  } catch (error) {
    res.status(500).json("Error in Fetching the Data");
  }
};
