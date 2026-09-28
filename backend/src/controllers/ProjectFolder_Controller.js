import { ProjectFolder } from "../models/ProjectFolder_Model.js";

export const CreateProjectFolder = async (req, res) => {
  try {
    const { title, description, category, duration } = req.body;

    const folder = await ProjectFolder.create({
      title,
      description,
      category,
      duration,
    });

    res.status(201).json({
      success: true,
      message: "Project folder created successfully",
      data: folder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetProjectFolders = async (req, res) => {
  try {
    const folders = await ProjectFolder.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: folders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateProjectFolder = async (req, res) => {
  try {
    const { title, description, category, duration } = req.body;

    const folder = await ProjectFolder.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        duration,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Project folder not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project folder updated successfully",
      data: folder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteProjectFolder = async (req, res) => {
  try {
    const folder = await ProjectFolder.findByIdAndDelete(
      req.params.id
    );

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Project folder not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project folder deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};