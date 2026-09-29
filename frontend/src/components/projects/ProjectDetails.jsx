import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SlideRight from "../../animations/SlideRight";
import SlideLeft from "../../animations/SlideLeft";
import FadeIn from "../../animations/FadeIn";
import PageLines from "../../animations/FallingParticles";

export const ProjectDetails = () => {
  const { state } = useLocation();

  const project = state?.project;

  if (!project) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-28 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>

          <Link
            to="/projects/professional"
            className="mt-5 inline-flex items-center gap-2 text-sm text-purple-400"
          >
            <FaArrowLeft size={12} />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-24 text-white">
      <PageLines/>
      <div className="mx-auto max-w-9xl">
        <Link
          to={`/projects/professional/${project.folderId?._id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-400"
        >
          <FaArrowLeft size={12} />
          Back to Projects
        </Link>
        <FadeIn>
          
        <div className="grid min-h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:grid-cols-2">
          <SlideRight>
          <div className="h-[400px] lg:h-full">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full "
            />
          </div>
          </SlideRight>
          <SlideLeft delay={0.15}>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              Professional Project
            </span>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            <div className="mt-6 h-px w-16 bg-purple-500" />

            <p className="mt-6 text-sm leading-7 text-gray-400 sm:text-base">
              {project.description}
            </p>

            <div className="mt-8">
              <h2 className="mb-3 text-sm font-semibold text-white">
                Technologies
              </h2>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
              >
                <FaExternalLinkAlt size={12} />
                Live Demo
              </a>

              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-purple-500/30 hover:text-white"
              >
                <FaGithub size={15} />
                GitHub
              </a>
            </div>
          </div>
          </SlideLeft>
        </div>
        </FadeIn>
      </div>
    </section>
  );
};