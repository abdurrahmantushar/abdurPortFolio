import mongoose from "mongoose";

const ProjectFolderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["personal", "professional"],
    },
  },
  { timestamps: true }
);

export const ProjectFolder = mongoose.model(
  "ProjectFolder",
  ProjectFolderSchema
);