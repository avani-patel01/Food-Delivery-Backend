import { VandorModel } from "../models/VandorModel.js";

export const GetFoodAvailability = async (req, res) => {
  const pincode = req.params.pincode;
  try {
    const vandor = await VandorModel.find({
      pincode: pincode,
      serviceavailable: false,
    })
      .sort({ rating: "desc" })
      .populate("foods");

    if (!vandor.length) {
      res.status(400).json({ message: "Foods not available in this area!" });
    } else {
      res.status(200).json(vandor);
    }
  } catch (error) {
    res.status(500).json("Error in Getting the Data");
  }
};

export const GetTop3Restaurant = async (req, res) => {
  const pincode = req.params.pincode;
  try {
    const result = await VandorModel.find({
      pincode: pincode,
      serviceavailable: false,
    })
      .sort({ rating: "desc" })
      .limit(3);

    if (!result.length) {
      res.status(400).json({ message: "Top Restaurant not found!" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json("Error in Getting the Data");
  }
};

export const GetFoodsIn30Min = async (req, res) => {
  const pincode = req.params.pincode;
  try {
    const result = await VandorModel.find({
      pincode: pincode,
      serviceavailable: false,
    }).populate("foods");
    if (!result.length) {
      res.status(400).json({ message: "Top Restaurant not found!" });
    } else {
      let foodResults = [];
      result.map((vandor) => {
        const foods = vandor.foods;
        foodResults.push(...foods.filter((food) => food.readyTime <= 30));
      });

      res.status(200).json(foodResults);
    }
  } catch (error) {
    res.status(500).json("Error in Getting the Data");
  }
};
export const SearchFoods = async (req, res) => {
  const pincode = req.params.pincode;
  try {
    const result = await VandorModel.find({
      pincode: pincode,
      serviceavailable: false,
    }).populate("foods");

    if (!result.length) {
      res.status(400).json({ message: "Foods not available in this area!" });
    } else {
      let foodResults = [];
      result.map((vandor) => {
        const foods = vandor.foods;
        foodResults.push(...foods);
      });

      res.status(200).json(foodResults);
    }
  } catch (error) {
    res.status(500).json("Error in Getting the Data");
  }
};

export const RestaurantById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await VandorModel.findById(id).populate("foods");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Error in Getting data!");
  }
};
