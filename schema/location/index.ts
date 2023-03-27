import { Schema, model } from "mongoose";

const locationSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LocationSchema = model("Location", locationSchema);
export { LocationSchema };
