import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaPlus,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Axios } from "../../common/Axios";
import { SummaryApi } from "../../common/Summry_api";
import {
  ProfessionalHeaderAnimation,
  ProfessionalFolderAnimation,
  ProfessionalIconAnimation,
  ProfessionalGlowAnimation,
} from "../../animations/ProfessionalProjectsAnimation";

export const ProfessionalProject = () => {
  const [folders, setFolders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteFolderId, setDeleteFolderId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const getFolders = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.projectFolder,
      });

      if (res.data.success) {
        const professionalFolders = res.data.data.filter(
          (folder) => folder.category === "professional"
        );

        setFolders(professionalFolders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    setIsAdmin(role === "admin");
    getFolders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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
          category: "professional",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setFolders((prev) => [res.data.data, ...prev]);

        setFormData({
          title: "",
          description: "",
        });

        setModalOpen(false);
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
        setFolders((prev) =>
          prev.filter((folder) => folder._id !== id)
        );

        setDeleteFolderId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <ProfessionalGlowAnimation>
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />
      </ProfessionalGlowAnimation>

      <ProfessionalGlowAnimation>
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />
      </ProfessionalGlowAnimation>

      <div className="relative mx-auto max-w-6xl">
        <ProfessionalHeaderAnimation>
          <div className="mb-10">
            <Link
              to="/projects"
              className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-purple-400"
            >
              <FaArrowLeft size={12} />
              Back to Projects
            </Link>

            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <ProfessionalIconAnimation>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                    <FaBriefcase size={20} />
                  </div>
                </ProfessionalIconAnimation>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                    My Work
                  </p>

                  <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                    Professional{" "}
                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      Projects
                    </span>
                  </h1>
                </div>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-500"
                >
                  <FaPlus size={12} />
                  Create Folder
                </button>
              )}
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400">
              A collection of projects built through professional work,
              internships, assignments, and real-world development experience.
            </p>
          </div>
        </ProfessionalHeaderAnimation>

        {folders.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map((folder, index) => (
              <ProfessionalFolderAnimation
                key={folder._id}
                delay={index * 0.15}
              >
                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05]">
                  <Link
                    to={`/projects/professional/${folder._id}`}
                  >
                    <ProfessionalIconAnimation>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                        <FaBriefcase size={19} />
                      </div>
                    </ProfessionalIconAnimation>

                    <h2 className="text-xl font-bold text-white transition group-hover:text-purple-300">
                      {folder.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                      {folder.description}
                    </p>

                    <div className="mt-5 text-sm font-semibold text-purple-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-pink-400">
                      View Projects →
                    </div>
                  </Link>

                  {isAdmin && (
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={() => setDeleteFolderId(folder._id)}
                        className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                      >
                        <FaTrash size={11} />
                        Delete Folder
                      </button>
                    </div>
                  )}
                </div>
              </ProfessionalFolderAnimation>
            ))}
          </div>
        ) : (
          <ProfessionalFolderAnimation>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
              <FaBriefcase className="mx-auto text-3xl text-purple-400" />

              <h2 className="mt-4 text-lg font-semibold text-white">
                No Professional Folders Yet
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Create a folder to organize your professional projects.
              </p>
            </div>
          </ProfessionalFolderAnimation>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">
                  Professional Work
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  Create Folder
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

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Company or organization name"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
              />

              <textarea
                name="description"
                placeholder="Folder description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Create Folder
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
              This folder will be permanently deleted. Are you sure you want
              to continue?
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
                Delete Folder
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalProject;