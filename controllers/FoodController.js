import { FoodModel } from "../models/FoodModel.js";
import { VandorModel } from "../models/VandorModel.js";

export const AddFoodController = async (req, res) => {
  const vandor = req.Vandor;
  const VandorDetails = await VandorModel.findById(vandor.id);
  if (!VandorDetails) {
    return res.status(400).json({ error: "Vandor not found" });
  }
  const { name, description, category, foodType, readyTime, price } = req.body;

  const files = req.files;
  const images = files.map((file) => file.filename);

  const createFood = await FoodModel.create({
    vandorId: VandorDetails._id,
    name: name,
    description: description,
    category: category,
    foodType: foodType,
    readyTime: readyTime,
    price: price,
    images: images,
  });

  VandorDetails.foods.push(createFood);
  await VandorDetails.save();
  try {
    res.status(200).json(VandorDetails);
  } catch (error) {
    res.send(500).json("Error in Fetching the Data");
  }
};

export const GetFoodController = async (req, res) => {
  try {
    const food = await FoodModel.find();
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json("Error in Getting The Data");
  }
};
