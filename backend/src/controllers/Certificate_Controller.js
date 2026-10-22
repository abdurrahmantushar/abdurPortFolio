import { uploadImageCloude } from "../Clodenary/image_upload.js";
import Certificate from "../models/Certificate_Model.js";

export const CreateCertificate = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      issuer,
      issueDate,
      credentialUrl,
      icon,
      accent,
    } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({
        success: false,
        message: "Title and issuer are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Certificate image is required",
      });
    }

    const image = await uploadImageCloude(req.file);

    const certificate = await Certificate.create({
      title,
      subtitle,
      issuer,
      issueDate,
      image: image.secure_url,
      credentialUrl,
      icon,
      accent,
    });

    return res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateCertificate = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      issuer: req.body.issuer,
      issueDate: req.body.issueDate,
      credentialUrl: req.body.credentialUrl,
      icon: req.body.icon,
      accent: req.body.accent,
    };

    if (req.file) {
      const image = await uploadImageCloude(req.file);
      updateData.image = image.secure_url;
    }

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(
      req.params.id
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
      data: certificate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};