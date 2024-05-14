import express from "express";
import {
  GetFoodAvailability,
  GetFoodsIn30Min,
  GetTop3Restaurant,
  RestaurantById,
  SearchFoods,
} from "../controllers/ShoppingController.js";
const router = express.Router();

// ------------------- Food Availability ------------------------ //
router.get("/:pincode", GetFoodAvailability);
// ------------------- Top Restaurants --------------------------- //
router.get("/top-three-restaurants/:pincode", GetTop3Restaurant);
// --------------- Food Available in 30 mintues ------------------ //
router.get("/foods-in-30-min/:pincode", GetFoodsIn30Min);
// ---------------------- Search Foods --------------------------- //
router.get("/search/:pincode", SearchFoods);
// -------------------- Find Restaurant By Id -------------------- //
router.get("/restaurant/:id", RestaurantById);

export { router as ShoppingRoute };
