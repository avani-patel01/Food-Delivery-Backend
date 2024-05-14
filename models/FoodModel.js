import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    vandorId: { type: String },
    name: { type: String },
    description: { type: String, default: "" },
    category: { type: String },
    foodType: { type: String },
    readyTime: Number,
    price: Number,
    images: { type: [String] },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const FoodModel = mongoose.model("foods", FoodSchema);
