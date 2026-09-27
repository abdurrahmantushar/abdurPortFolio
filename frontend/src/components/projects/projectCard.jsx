import { useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Axios } from "../../common/Axios";
import {
  ProjectImageAnimation,
  ProjectTechAnimation,
  ProjectButtonAnimation,
} from "../../animations/ProjectCardAnimation";

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const [isAdmin] = useState(localStorage.getItem("role") === "admin");

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const res = await Axios({
        url: `/api/project/${project._id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        onDelete(project._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05]">
      <ProjectImageAnimation
        src={project.image}
        alt={project.title}
      />

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <ProjectTechAnimation
              key={index}
              delay={index * 0.08}
            >
              <span className="block rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[11px] font-medium text-purple-300">
                {tech}
              </span>
            </ProjectTechAnimation>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white transition group-hover:text-purple-300">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
          {project.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <ProjectButtonAnimation>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-500"
            >
              <FaExternalLinkAlt size={11} />
              Live Demo
            </a>
          </ProjectButtonAnimation>

          <ProjectButtonAnimation>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-purple-500/30 hover:text-white"
            >
              <FaGithub size={14} />
              GitHub
            </a>
          </ProjectButtonAnimation>
        </div>

        {isAdmin && (
          <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/20"
            >
              <FaEdit size={11} />
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              <FaTrash size={11} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;