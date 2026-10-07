import express from "express";
import cors from "cors";
import dns from "dns";
import { ConnectDB } from "./config/Connect_DB.js";
import Study_Route from "./routes/Study_Route.js";
import Skill_Route from "./routes/Skill_Route.js";
import Project_Route from "./routes/Project_Route.js";
import About_Route from "./routes/About_Route.js";
import Hero_Route from "./routes/Hero_Route.js";
import Admin_Route from "./routes/Admin_Route.js";
import ProjectFolder_Route from "./routes/ProjectFolder_Route.js";

export const app = express();

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio server is running",
  });
});

app.use("/api/hero", Hero_Route);
app.use("/api/about", About_Route);
app.use("/api/project", Project_Route);
app.use("/api/skill", Skill_Route);
app.use("/api/study", Study_Route);
app.use("/api/admin", Admin_Route);
app.use("/api/project-folder", ProjectFolder_Route);

ConnectDB();

app.listen(4501, () => {
  console.log("Server running on port 4501");
});

export default app;
