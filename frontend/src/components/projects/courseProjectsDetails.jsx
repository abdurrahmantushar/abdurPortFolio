import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaTrash,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../common/Axios";
import { SummaryApi } from "../../common/Summry_api";
import PageLines from "../../animations/FallingParticles";
import Loading from "../Loading";

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-4 mt-6 text-2xl font-bold text-white">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-7 text-xl font-bold text-white">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-6 text-lg font-bold text-white">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-emerald-400 underline underline-offset-4 transition hover:text-emerald-300"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-7 border-white/10" />,
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-2 border-emerald-500/50 pl-4 text-gray-400">
      {children}
    </blockquote>
  ),
};

const CourseProjectDetails = () => {
  const { folderId, projectId } = useParams();
  const BACK_LINK = `/projects/course/${folderId}`;
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProject = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.project,
      });

      if (res.data.success) {
        const currentProject = res.data.data.find(
          (item) => item._id === projectId && item.category === "course"
        );

        setProject(currentProject || null);
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
      await getProject();
      setLoading(false);
    };

    loadData();
  }, [projectId]);

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
        navigate(BACK_LINK);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!project) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-28 text-white">
        <PageLines />

        <div className="relative z-[30] mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/20 text-emerald-300">
            <FaGraduationCap size={22} />
          </div>

          <h1 className="mt-5 text-2xl font-bold">Project not found</h1>

          <p className="mt-2 text-sm text-gray-400">
            This course project doesn&apos;t exist or was removed.
          </p>

          <Link
            to={BACK_LINK}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            <FaArrowLeft size={12} />
            Back to folder
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <PageLines />

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative z-[30] mx-auto max-w-6xl">
        <div className="mb-10">
          <Link
            to={BACK_LINK}
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-emerald-400"
          >
            <FaArrowLeft size={12} />
            Back to folder
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/20 text-emerald-300">
                <FaGraduationCap size={22} />
              </div>

              <div>
                {project.folderId?.title && (
                  <p className="text-sm font-medium text-emerald-300">
                    {project.folderId.title}
                  </p>
                )}

                <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                  {project.title}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {project.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
          <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] sm:h-96 lg:sticky lg:top-24 lg:h-[500px] lg:self-start">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <div className="absolute bottom-5 left-5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              Course project
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
              {project.title}
            </h2>

            {(project.liveLink || project.githubLink) && (
              <div className="mb-8 flex flex-wrap gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    <FaExternalLinkAlt size={11} />
                    Live demo
                    <FaArrowRight size={10} />
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-emerald-500/30 hover:text-white"
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                )}
              </div>
            )}

            <div className="border-t border-white/10 pt-7">
              <h3 className="mb-4 text-sm font-medium text-emerald-300">
                About this assignment
              </h3>

              <div className="text-sm leading-7 text-gray-400">
                <ReactMarkdown components={markdownComponents}>
                  {project.description || ""}
                </ReactMarkdown>
              </div>
            </div>

            {isAdmin && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <Link
                  to={BACK_LINK}
                  state={{ editProject: project }}
                  className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/20"
                >
                  <FaEdit size={11} />
                  Edit project
                </Link>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                >
                  <FaTrash size={11} />
                  Delete project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseProjectDetails;