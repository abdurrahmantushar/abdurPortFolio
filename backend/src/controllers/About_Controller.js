import { About } from "../models/About_Model.js";

export const CreateAbout = async (req, res) => {
  try {
    const about = await About.create(req.body);

    res.status(201).json({
      success: true,
      message: "About created successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetAbout = async (req, res) => {
  try {
    const about = await About.findOne();

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};