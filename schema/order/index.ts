import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rate: { type: Number, required: true },
    cost: { type: Number, required: true },
    vendor: {
      ref: "Vendor",
      type: Schema.Types.ObjectId,
    },
    item: {
      ref: "Item",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const OrderSchema = model("Order", orderSchema);

export { OrderSchema };
