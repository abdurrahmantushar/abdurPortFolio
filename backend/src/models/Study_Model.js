import mongoose from "mongoose";

const StudySchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Study = mongoose.model("Study", StudySchema);