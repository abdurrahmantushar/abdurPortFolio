import { CgDanger } from "react-icons/cg";
import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiSocketdotio } from "react-icons/si";

import picture2 from "../assets/picture2.png";
import xaiproject from "../assets/xaiproject.png";
import gossip from "../assets/gossip.png";

export const Projects = () => {
  const projects = [
    {
      image: picture2,
      title: "Full Stack E-Commerce Platform",
      description:
        "A modern MERN e-commerce application featuring user authentication, REST API integration, product management, shopping cart functionality, and a responsive user interface.",
      technologies: [
        { name: "React", icon: <FaReact /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "MongoDB", icon: <SiMongodb /> },
      ],
      live: "https://abdur-e-commerce-1.vercel.app/",
      github: "https://github.com/abdurrahmantushar",
    },

    {
      image: xaiproject,
      title: "XAI – Intelligence Workspace",
      description:
        "A modern AI-powered product experience built with React, Vite, Tailwind CSS, and Framer Motion featuring interactive animations, responsive layouts, dashboard visualization, and smooth user interactions.",
      technologies: [
        { name: "React", icon: <FaReact /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
      ],
      live: "https://xai-frontend-abdur.vercel.app/",
      github: "https://github.com/abdurrahmantushar/Xai-frontend-abdur",
    },

    {
      image: gossip,
      title: "Gossip – Real-Time Chat",
      description:
        "A modern real-time chat application featuring messaging, audio calls, typing indicators, message reactions, replies, editing, deletion, media sharing, and responsive UI.",
      technologies: [
        { name: "React", icon: <FaReact /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Socket.io", icon: <SiSocketdotio /> },
      ],
      live: "https://gossip-abdur.vercel.app/",
      github: "https://github.com/abdurrahmantushar/gossip.abdur",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-950 to-black text-white px-4 sm:px-6 lg:px-10 py-10 sm:py-14">

      <div className="max-w-7xl mx-auto mb-10 sm:mb-14">

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <CgDanger className="text-purple-400 text-2xl sm:text-3xl" />
          </div>

          <div>
            <p className="text-purple-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]">
              My Work
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Featured Projects
            </h1>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-gray-400 text-sm sm:text-base leading-7">
          A collection of projects I've built while exploring modern web
          technologies, full-stack development, real-time communication,
          and interactive user experiences.
        </p>

      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

        {projects.map((project, index) => (
          <div
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-purple-500/10"
          >

            <div className="relative overflow-hidden">

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 sm:h-52 lg:h-48 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />

              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-gray-300">
                0{index + 1}
              </span>

            </div>

            <div className="flex flex-col flex-1 p-5">

              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {project.title}
              </h2>

              <p className="text-sm text-gray-400 mt-3 leading-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">

                {project.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                  >
                    <span className="text-purple-400">
                      {tech.icon}
                    </span>

                    {tech.name}
                  </span>
                ))}

              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  Live Demo
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all duration-300"
                >
                  <FaGithub size={15} />
                  GitHub
                </a>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};