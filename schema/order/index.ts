import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    vendor: {
      ref: "Vendor",
      type: Schema.Types.ObjectId,
    },
    assembly: {
      ref: "Assembly",
      type: Schema.Types.ObjectId,
    },
    issuedBy:{
      type: String,
      required: true,
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
