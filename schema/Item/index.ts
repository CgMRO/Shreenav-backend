import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    SAPCode: {
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
    minQuantity: {
      type: Number,
      required: true,
    },
    vendor: {
      ref: "vendor",
      type: Schema.Types.ObjectId,
    },
    location: {
      ref: "Location",
      type: Schema.Types.ObjectId,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ItemsSchema = model("Item", itemSchema);

export { ItemsSchema };
