import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../common/Axios";
import { SummaryApi } from "../../common/Summry_api";
import ProjectCard from "./projectCard";
import { ProjectCardAnimation } from "../../animations/ProjectCardAnimation";
import PageLines from "../../animations/FallingParticles";
import Loading from "../Loading";

const ProfessionalProjectDetails = () => {
  const { folderId } = useParams();

  const [folder, setFolder] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    liveLink: "",
    githubLink: "",
    image: null,
  });

  const getFolder = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.projectFolder,
      });

      if (res.data.success) {
        const currentFolder = res.data.data.find(
          (item) => item._id === folderId
        );

        setFolder(currentFolder);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.project,
      });

      if (res.data.success) {
        const folderProjects = res.data.data.filter(
          (project) => project.folderId?._id === folderId
        );

        setProjects(folderProjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    setIsAdmin(role === "admin");
    setLoading(true);

    const loadData = async () => {
      await Promise.all([getFolder(), getProjects()]);
      setLoading(false);
    };

    loadData();
  }, [folderId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      data.append(
        "technologies",
        JSON.stringify(
          formData.technologies
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
        )
      );

      data.append("liveLink", formData.liveLink);
      data.append("githubLink", formData.githubLink);
      data.append("category", "professional");
      data.append("folderId", folderId);
      data.append("image", formData.image);

      const res = await Axios({
        url: SummaryApi.project.url,
        method: "post",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        const newProject = {
          ...res.data.data,
          folderId: {
            _id: folderId,
          },
        };

        setProjects((prev) => [newProject, ...prev]);

        setFormData({
          title: "",
          description: "",
          technologies: "",
          liveLink: "",
          githubLink: "",
          image: null,
        });

        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setProjects((prev) =>
      prev.filter((project) => project._id !== id)
    );
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      data.append(
        "technologies",
        JSON.stringify(
          formData.technologies
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
        )
      );

      data.append("liveLink", formData.liveLink);
      data.append("githubLink", formData.githubLink);
      data.append("category", "professional");
      data.append("folderId", folderId);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await Axios({
        url: `/api/project/${editProject._id}`,
        method: "put",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        const updatedProject = {
          ...res.data.data,
          folderId: {
            _id: folderId,
          },
        };

        setProjects((prev) =>
          prev.map((project) =>
            project._id === updatedProject._id
              ? updatedProject
              : project
          )
        );

        setEditProject(null);
        setModalOpen(false);

        setFormData({
          title: "",
          description: "",
          technologies: "",
          liveLink: "",
          githubLink: "",
          image: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!folder) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-28 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-2xl font-bold">
            Folder not found
          </h1>

          <Link
            to="/projects/professional"
            className="mt-5 inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
          >
            <FaArrowLeft size={12} />
            Back to Professional Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <PageLines />

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative z-[30] mx-auto max-w-6xl">
        <div className="mb-10">
          <Link
            to="/projects/professional"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-purple-400"
          >
            <FaArrowLeft size={12} />
            Back to Professional Projects
          </Link>

          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                <FaBriefcase size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                  Professional Work
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                  {folder.title}
                </h1>

                {folder.duration && (
                  <p className="mt-4 text-sm font-medium text-purple-400">
                    Duration:{" "}
                    <span className="text-white">
                      {folder.duration}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-500"
              >
                <FaPlus size={12} />
                Create Project
              </button>
            )}
          </div>

          <div className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-medium text-purple-400">
              About This Platform Experience
            </p>

            <div className="mt-3 text-sm leading-7 text-gray-400">
              <ReactMarkdown
                components={{
                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-6 text-lg font-bold text-white">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-2 pl-5">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li>{children}</li>
                  ),
                }}
              >
                {folder.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCardAnimation
                key={project._id}
                index={index}
              >
                <ProjectCard
                  project={project}
                  onDelete={handleDelete}
                  onEdit={(project) => {
                    setEditProject(project);

                    setFormData({
                      title: project.title || "",
                      description: project.description || "",
                      technologies: (
                        project.technologies || []
                      ).join(", "),
                      liveLink: project.liveLink || "",
                      githubLink: project.githubLink || "",
                      image: null,
                    });

                    setModalOpen(true);
                  }}
                />
              </ProjectCardAnimation>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
            <FaBriefcase className="mx-auto text-3xl text-purple-400" />

            <h2 className="mt-4 text-lg font-semibold text-white">
              No Projects Yet
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Create a project to add it to this folder.
            </p>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">
                  {folder.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  {editProject
                    ? "Edit Project"
                    : "Create Project"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <form
              onSubmit={
                editProject
                  ? handleUpdateProject
                  : handleCreateProject
              }
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
              />

              <textarea
                name="description"
                placeholder="Project description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
              />

              <input
                type="text"
                name="technologies"
                placeholder="Technologies: React, Node.js, MongoDB"
                value={formData.technologies}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
              />

              <input
                type="url"
                name="liveLink"
                placeholder="Live project link"
                value={formData.liveLink}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
              />

              <input
                type="url"
                name="githubLink"
                placeholder="GitHub repository link"
                value={formData.githubLink}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
              />

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Project Image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required={!editProject}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {editProject
                  ? "Update Project"
                  : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalProjectDetails;