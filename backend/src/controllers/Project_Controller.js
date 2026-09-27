import { uploadImageCloude } from "../Clodenary/image_upload.js";
import { Project } from "../models/Project_Model.js";

export const CreateProject = async (req, res) => {
  try {
    const image = await uploadImageCloude(req.file);

    let technologies = req.body.technologies;

    if (typeof technologies === "string") {
      try {
        technologies = JSON.parse(technologies);
      } catch {
        technologies = [technologies];
      }
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      image: image.secure_url,
      technologies,
      liveLink: req.body.liveLink,
      githubLink: req.body.githubLink,
      category: req.body.category,
      folderId: req.body.folderId || null,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("folderId")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateProject = async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies,
      liveLink: req.body.liveLink,
      githubLink: req.body.githubLink,
      category: req.body.category,
      folderId: req.body.folderId || null,
    };

    if (typeof updateData.technologies === "string") {
      try {
        updateData.technologies = JSON.parse(updateData.technologies);
      } catch {
        updateData.technologies = [updateData.technologies];
      }
    }

    if (req.file) {
      const image = await uploadImageCloude(req.file);
      updateData.image = image.secure_url;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};