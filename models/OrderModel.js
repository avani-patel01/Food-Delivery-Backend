import mongoose, { Schema } from "mongoose";

export const OrderSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },
    items: [
      {
        food: { type: Schema.Types.ObjectId, ref: "food", required: true },
        unit: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number },
    orderDate: { type: Date, default: Date.now() },
    paidThrough: { type: String },
    paymentResponse: { type: String },
    orderStatus: { type: String },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("orders", OrderSchema);
