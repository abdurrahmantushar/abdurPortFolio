import { Link } from "react-router-dom";
import { FaArrowRight, FaBriefcase, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

import {
  ProjectsHeaderAnimation,
  ProjectCardAnimation,
  ProjectIconAnimation,
  ProjectLinkAnimation,
} from "../animations/ProjectsAnimation";

export const ProjectPage = () => {
  const projectCategories = [
    {
      id: 1,
      title: "Personal Projects",
      description:
        "Projects I built to practice my skills, explore new technologies, and solve real-world problems.",
      icon: <FaCode />,
      link: "/projects/personal",
      button: "View Personal Projects",
    },
    {
      id: 2,
      title: "Professional Projects",
      description:
        "Projects completed through internships, professional work, and real-world development experience.",
      icon: <FaBriefcase />,
      link: "/projects/professional",
      button: "View Professional Projects",
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-[calc(100vh-70px)] overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <motion.div
        animate={{
          x: [0, 40, 0, -40, 0],
          y: [0, -25, 0, 25, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0, 40, 0],
          y: [0, 25, 0, -25, 0],
          scale: [1, 0.9, 1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <ProjectsHeaderAnimation>
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
              My Projects
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Explore My{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Work
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400">
              Explore my personal experiments and professional development
              work.
            </p>
          </div>
        </ProjectsHeaderAnimation>

        <div className="grid gap-6 md:grid-cols-2">
          {projectCategories.map((category, index) => (
            <ProjectCardAnimation
              key={category.id}
              delay={index * 0.2}
            >
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05] sm:p-9">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition duration-500 group-hover:bg-purple-500/20" />

                <div className="relative">
                  <ProjectIconAnimation>
                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                      {category.icon}
                    </div>
                  </ProjectIconAnimation>

                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.25,
                    }}
                    className="text-2xl font-bold text-white"
                  >
                    {category.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.35,
                    }}
                    className="mt-4 max-w-md text-sm leading-7 text-gray-400"
                  >
                    {category.description}
                  </motion.p>

                  <ProjectLinkAnimation>
                    <Link
                      to={category.link}
                      className="mt-8 flex w-fit items-center gap-2 text-sm font-semibold text-purple-400 transition-all duration-300 group-hover:text-pink-400"
                    >
                      {category.button}
                      <FaArrowRight size={12} />
                    </Link>
                  </ProjectLinkAnimation>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2 + 0.4,
                  }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </ProjectCardAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};