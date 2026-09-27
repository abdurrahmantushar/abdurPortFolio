import { Study } from "../models/Study_Model.js";

export const CreateStudy = async (req, res) => {
  try {
    const study = await Study.create(req.body);

    res.status(201).json({
      success: true,
      message: "Study created successfully",
      data: study,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetStudies = async (req, res) => {
  try {
    const studies = await Study.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: studies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateStudy = async (req, res) => {
  try {
    const study = await Study.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "Study not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Study updated successfully",
      data: study,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteStudy = async (req, res) => {
  try {
    const study = await Study.findByIdAndDelete(req.params.id);

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "Study not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Study deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};