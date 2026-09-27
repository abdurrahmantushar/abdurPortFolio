import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["technical", "language"],
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model("Skill", SkillSchema);