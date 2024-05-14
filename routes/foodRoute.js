import express from "express";
import {
  AddFoodController,
  GetFoodController,
} from "../controllers/FoodController.js";
import { AuthVandorMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/imageStorage.js";
const router = express.Router();

//  ---------------------- Food  Routes ----------------------- //
router.post("/add-food", AuthVandorMiddleware, upload, AddFoodController);
router.get("/", AuthVandorMiddleware, GetFoodController);

export { router as FoodRoute };
