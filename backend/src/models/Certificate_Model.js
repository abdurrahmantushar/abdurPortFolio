import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    issueDate: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    credentialUrl: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "code",
    },
    accent: {
      type: String,
      enum: ["purple", "green", "cyan", "blue", "gray"],
      default: "purple",
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", CertificateSchema);

export default Certificate;