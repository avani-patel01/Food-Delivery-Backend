import express from "express";
import {
  UpdateVandorProfile,
  UpdateVandorService,
  createVandor,
  getVandor,
  getVandorById,
  getVandorProfile,
  vandorLogin,
} from "../controllers/VandorController.js";
import {
  VandorLoginValidator,
  VandorProfileValidator,
  VandorValidator,
} from "../valiodators/VandorValidator.js";
import { AuthVandorMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/imageStorage.js";
const router = express.Router();

// ------------------------- Vandor Register Route ------------------------ //
router.get("/", getVandor);
router.post("/signup", VandorValidator, createVandor);
router.post("/login", VandorLoginValidator, vandorLogin);

// ------------------------- Vandor Profile Route ------------------------------ //
router.get("/profile", AuthVandorMiddleware, getVandorProfile);
router.post(
  "/profile",
  AuthVandorMiddleware,
  upload,
  VandorProfileValidator,
  UpdateVandorProfile
);
router.get("/:id", getVandorById);

// --------------------- Vandor Update  Service Routes ---------------------- //
router.post("/service", AuthVandorMiddleware, UpdateVandorService);

export { router as VandorRoute };
