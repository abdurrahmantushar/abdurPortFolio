import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
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
    technologies: {
      type: [String],
      required: true,
    },
    liveLink: {
      type: String,
      default: '',
    },
    courseName: {
      type: String,
      default: "",
    },
    githubLink: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["personal", "professional", "course"],
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectFolder",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", ProjectSchema);