import express from "express";
import {
  CreateOrder,
  CustomerLogin,
  CustomerProfile,
  CustomerSignup,
  CustomerVerify,
  EditCustomerProfile,
  GetOrderById,
  GetOrders,
  RequestOTP,
  AddToCart,
  DeleteCart,
  GetCart,
} from "../controllers/CustomerController.js";
import { AuthVandorMiddleware } from "../middleware/authMiddleware.js";
import {
  CustomerLoginValidator,
  CustomerValidator,
} from "../valiodators/CustomerValidator.js";

const router = express.Router();

router.post("/signup", CustomerValidator, CustomerSignup);
router.post("/verify", AuthVandorMiddleware, CustomerVerify);
router.post("/login", CustomerLoginValidator, CustomerLogin);
router.get("/otp", AuthVandorMiddleware, RequestOTP);
router.get("/profile", AuthVandorMiddleware, CustomerProfile);
router.post("/profile", AuthVandorMiddleware, EditCustomerProfile);

// Cart
router.post("/cart", AuthVandorMiddleware, AddToCart);
router.get("/cart", AuthVandorMiddleware, GetCart);
router.delete("/cart", AuthVandorMiddleware, DeleteCart);

// Payment
// Order
router.post("/create-order", AuthVandorMiddleware, CreateOrder);
router.get("/orders", AuthVandorMiddleware, GetOrders);
router.get("/order/:id", AuthVandorMiddleware, GetOrderById);

export { router as CustomerRoute };
