import express from "express";
import { VandorRoute } from "../routes/vandorRoute.js";
import { FoodRoute } from "./foodRoute.js";
import { ShoppingRoute } from "./shoppingRoute.js";
import { CustomerRoute } from "./customerRoute.js";

export const router = express.Router();

router.use("/food", FoodRoute);
router.use("/vandor", VandorRoute);
router.use("/shopping", ShoppingRoute);
router.use("/customer", CustomerRoute);
