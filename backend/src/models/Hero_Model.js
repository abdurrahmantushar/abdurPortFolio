import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specializingIn: {
       type: String,
       required: true 
    },
    badgeText:{ 
      type: String, 
      required: true 
  },
  },
  {
    timestamps: true,
  }
);

export const Hero = mongoose.model("Hero", HeroSchema);