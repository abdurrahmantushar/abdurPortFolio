import jwt from "jsonwebtoken";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
console.log(process.env.ADMIN_EMAIL);
console.log(process.env.ADMIN_PASSWORD);
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};