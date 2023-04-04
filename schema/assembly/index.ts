import { Schema, model } from "mongoose";

const assemblySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AssemblyScehema = model("Assembly", assemblySchema);

export { AssemblyScehema };
