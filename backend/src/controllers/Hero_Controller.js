import { uploadImageCloude } from "../Clodenary/image_upload.js";
import { Hero } from "../models/Hero_Model.js";

export const CreateHero = async (req, res) => {
  try {
    const image = await uploadImageCloude(req.file);

    const hero = await Hero.create({
      image: image.secure_url,
      description: req.body.description,
      specializingIn: req.body.specializingIn,
      badgeText: req.body.badgeText
    });

    res.status(201).json({
      success: true,
      message: "Hero created successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetHero = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateHero = async (req, res) => {
  try {
    let updateData = {
      description: req.body.description,
      specializingIn: req.body.specializingIn,
      badgeText: req.body.badgeText
    };

    if (req.file) {
      const image = await uploadImageCloude(req.file);
      updateData.image = image.secure_url;
    }

    const hero = await Hero.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero updated successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};