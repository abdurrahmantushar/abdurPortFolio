import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    introDescription: {
      type: String,
      required: true,
    },
    whoIAm: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    myGoal: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    projectsCount: {
      type: String,
      required: true,
    },
    projectsLabel: {
      type: String,
      required: true,
    },
    experienceCount: {
      type: String,
      required: true,
    },
    experienceLabel: {
      type: String,
      required: true,
    },
    opportunityTitle: {
      type: String,
      required: true,
    },
    opportunityDescription: {
      type: String,
      required: true,
    },
    opportunityButton: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const About = mongoose.model("About", AboutSchema);