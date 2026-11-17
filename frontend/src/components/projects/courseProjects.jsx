import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGraduationCap,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Axios } from "../../common/Axios";
import { SummaryApi } from "../../common/Summry_api";
import {
  ProfessionalHeaderAnimation as HeaderAnimation,
  ProfessionalFolderAnimation as FolderAnimation,
  ProfessionalIconAnimation as IconAnimation,
  ProfessionalGlowAnimation as GlowAnimation,
} from "../../animations/ProfessionalProjectsAnimation";
import PageLines from "../../animations/FallingParticles";
import Loading from "../Loading";

const CATEGORY = "course";
const emptyForm = { title: "", description: "", duration: "" };

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export const CourseProject = () => {
  const [folders, setFolders] = useState([]);
  const [counts, setCounts] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteFolderId, setDeleteFolderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);

  const getFolders = async () => {
    try {
      const res = await Axios({ ...SummaryApi.projectFolder });

      if (res.data.success) {
        setFolders(
          res.data.data.filter((folder) => folder.category === CATEGORY)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // assignment count for each folder
  const getCounts = async () => {
    try {
      const res = await Axios({ ...SummaryApi.project });

      if (res.data.success) {
        const result = {};

        res.data.data.forEach((project) => {
          const id = project.folderId?._id;
          if (project.category === CATEGORY && id) {
            result[id] = (result[id] || 0) + 1;
          }
        });

        setCounts(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsAdmin(localStorage.getItem("role") === "admin");

    Promise.all([getFolders(), getCounts()]).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(emptyForm);
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        url: SummaryApi.projectFolder.url,
        method: "post",
        data: {
          title: formData.title,
          description: formData.description,
          category: CATEGORY,
          duration: formData.duration,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setFolders((prev) => [res.data.data, ...prev]);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFolder = async (id) => {
    try {
      const res = await Axios({
        url: `/api/project-folder/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setFolders((prev) => prev.filter((folder) => folder._id !== id));
        setDeleteFolderId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <PageLines />

      <GlowAnimation>
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
      </GlowAnimation>
      <GlowAnimation>
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
      </GlowAnimation>

      <div className="relative mx-auto max-w-6xl">
        <HeaderAnimation>
          <div className="mb-10">
            <Link
              to="/projects"
              className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-emerald-400"
            >
              <FaArrowLeft size={12} />
              Back to projects
            </Link>

            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <IconAnimation>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/20 text-emerald-300">
                    <FaGraduationCap size={22} />
                  </div>
                </IconAnimation>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Course projects
                </h1>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  <FaPlus size={12} />
                  Add course folder
                </button>
              )}
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              One folder for each course I take, with the assignments and
              practice projects I built along the way.
            </p>
          </div>
        </HeaderAnimation>

        {folders.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map((folder, index) => {
              const count = counts[folder._id] || 0;

              return (
                <FolderAnimation key={folder._id} delay={index * 0.15}>
                  <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.05]">
                    <Link
                      to={`/projects/course/${folder._id}`}
                      className="flex flex-1 flex-col"
                    >
                      <div className="mb-5 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/25 to-teal-500/20 text-emerald-300">
                          <FaGraduationCap size={19} />
                        </div>

                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                          {count} {count === 1 ? "assignment" : "assignments"}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white transition group-hover:text-emerald-300">
                        {folder.title}
                      </h2>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                        {folder.description}
                      </p>

                      {folder.duration && (
                        <p className="mt-4 text-sm text-gray-400">
                          Duration:{" "}
                          <span className="text-white">{folder.duration}</span>
                        </p>
                      )}

                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200">
                        Open folder
                        <FaArrowRight
                          size={11}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </Link>

                    {isAdmin && (
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <button
                          type="button"
                          onClick={() => setDeleteFolderId(folder._id)}
                          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                        >
                          <FaTrash size={11} />
                          Delete folder
                        </button>
                      </div>
                    )}
                  </div>
                </FolderAnimation>
              );
            })}
          </div>
        ) : (
          <FolderAnimation>
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center">
              <FaGraduationCap className="mx-auto text-3xl text-emerald-400" />

              <h2 className="mt-4 text-lg font-semibold text-white">
                No course folders yet
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                {isAdmin
                  ? "Add a folder for your course, then put its assignments inside."
                  : "Folders for my courses will appear here."}
              </p>
            </div>
          </FolderAnimation>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white">
                Add course folder
              </h2>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Course name (e.g. React Course)"
                value={formData.title}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <textarea
                name="description"
                placeholder="What is this course about?"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className={`${inputClass} resize-none`}
              />

              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. Sep 2026 – Dec 2026)"
                value={formData.duration}
                onChange={handleChange}
                className={inputClass}
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Add folder
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteFolderId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <FaTrash size={18} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              Delete this folder?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              This folder will be permanently deleted. Are you sure you want to
              continue?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteFolderId(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleDeleteFolder(deleteFolderId)}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-500"
              >
                Delete folder
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseProject;