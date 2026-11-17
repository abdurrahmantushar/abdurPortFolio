import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaChevronDown,
  FaGraduationCap,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../common/Axios";
import { SummaryApi } from "../../common/Summry_api";
import ProjectCard from "./projectCard";
import { ProjectCardAnimation } from "../../animations/ProjectCardAnimation";
import PageLines from "../../animations/FallingParticles";
import Loading from "../Loading";

const CATEGORY = "course";
const PAGE_SIZE = 6;

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  liveLink: "",
  githubLink: "",
  image: null,
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

const CourseFolderDetails = () => {
  const { folderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [folder, setFolder] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [formData, setFormData] = useState(emptyForm);

  const getFolder = async () => {
    try {
      const res = await Axios({ ...SummaryApi.projectFolder });

      if (res.data.success) {
        setFolder(res.data.data.find((item) => item._id === folderId) || null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await Axios({ ...SummaryApi.project });

      if (res.data.success) {
        setProjects(
          res.data.data.filter((project) => project.folderId?._id === folderId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsAdmin(localStorage.getItem("role") === "admin");
    setLoading(true);
    setVisibleCount(PAGE_SIZE);

    Promise.all([getFolder(), getProjects()]).finally(() => setLoading(false));
  }, [folderId]);

  const openEditModal = (project) => {
    setEditProject(project);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      technologies: (project.technologies || []).join(", "),
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      image: null,
    });

    setModalOpen(true);
  };

  // "Edit project" button on the details page sends the project here
  useEffect(() => {
    if (!loading && location.state?.editProject) {
      openEditModal(location.state.editProject);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [loading]);

  const openCreateModal = () => {
    setEditProject(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditProject(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const buildPayload = () => {
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
    data.append("category", CATEGORY);
    data.append("folderId", folderId);

    if (formData.image) data.append("image", formData.image);

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        url: editProject
          ? `/api/project/${editProject._id}`
          : SummaryApi.project.url,
        method: editProject ? "put" : "post",
        data: buildPayload(),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        const saved = { ...res.data.data, folderId: { _id: folderId } };

        setProjects((prev) =>
          editProject
            ? prev.map((project) =>
                project._id === saved._id ? saved : project
              )
            : [saved, ...prev]
        );

        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((project) => project._id !== id));
  };

  if (loading) return <Loading />;

  if (!folder) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-28 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-2xl font-bold">Folder not found</h1>

          <Link
            to="/projects/course"
            className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
          >
            <FaArrowLeft size={12} />
            Back to course projects
          </Link>
        </div>
      </section>
    );
  }

  const visibleProjects = projects.slice(0, visibleCount);
  const hiddenCount = projects.length - visibleProjects.length;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <PageLines />

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative z-[30] mx-auto max-w-6xl">
        <div className="mb-10">
          <Link
            to="/projects/course"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-emerald-400"
          >
            <FaArrowLeft size={12} />
            Back to course folders
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/20 text-emerald-300">
                <FaGraduationCap size={22} />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {folder.title}
                </h1>

                <p className="mt-2 text-sm text-emerald-300">
                  {projects.length}{" "}
                  {projects.length === 1 ? "assignment" : "assignments"}
                  {folder.duration && (
                    <span className="text-gray-400">
                      {" "}
                      &middot; {folder.duration}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={openCreateModal}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                <FaPlus size={12} />
                Add assignment
              </button>
            )}
          </div>

          {folder.description && (
            <div className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-medium text-emerald-300">
                About this course
              </h2>

              <div className="mt-3 text-sm leading-7 text-gray-400">
                <ReactMarkdown
                  components={{
                    h3: ({ children }) => (
                      <h3 className="mb-3 mt-6 text-lg font-bold text-white">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="mb-4 list-disc space-y-2 pl-5">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                  }}
                >
                  {folder.description}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {projects.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <ProjectCardAnimation key={project._id} index={index % PAGE_SIZE}>
                  <ProjectCard
                    project={project}
                    onDelete={handleDelete}
                    onEdit={openEditModal}
                  />
                </ProjectCardAnimation>
              ))}
            </div>

            {hiddenCount > 0 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 px-6 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/10"
                >
                  Show {Math.min(hiddenCount, PAGE_SIZE)} more
                  <FaChevronDown size={11} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center">
            <FaGraduationCap className="mx-auto text-3xl text-emerald-400" />

            <h2 className="mt-4 text-lg font-semibold text-white">
              No assignments yet
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              {isAdmin
                ? "Use “Add assignment” to put the first one in this folder."
                : "Assignments from this course will appear here."}
            </p>
          </div>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-medium text-emerald-300">
                  {folder.title}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  {editProject ? "Edit assignment" : "Add assignment"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Assignment title"
                value={formData.title}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <textarea
                name="description"
                placeholder="What did you build in this assignment?"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className={`${inputClass} resize-none`}
              />

              <input
                type="text"
                name="technologies"
                placeholder="Technologies: React, Node.js, MongoDB"
                value={formData.technologies}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="url"
                  name="liveLink"
                  placeholder="Live link (optional)"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="url"
                  name="githubLink"
                  placeholder="GitHub repository link"
                  value={formData.githubLink}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Project image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required={!editProject}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {editProject ? "Save changes" : "Add assignment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseFolderDetails;