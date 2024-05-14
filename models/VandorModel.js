import mongoose from "mongoose";
import { FoodModel } from "./FoodModel.js";

const VandorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String, default: "" },
    phone: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    serviceavailable: { type: Boolean, default: false },
    coverImages: { type: [String] },
    rating: { type: Number, default: 0 },
    foods: [
      // {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: FoodModel,
      // },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const VandorModel = mongoose.model("Vandor", VandorSchema);
