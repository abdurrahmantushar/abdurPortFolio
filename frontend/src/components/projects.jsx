import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";

import {
  ProjectsHeaderAnimation,
  ProjectCardAnimation,
  ProjectIconAnimation,
  ProjectLinkAnimation,
} from "../animations/ProjectsAnimation";

const projectCategories = [
  {
    id: 1,
    title: "Personal Projects",
    description:
      "Projects I built to practice my skills, explore new technologies, and solve real-world problems.",
    icon: <FaCode />,
    link: "/projects/personal",
    button: "View personal projects",
    accent: {
      icon: "from-purple-500/25 to-fuchsia-500/20 text-purple-300",
      glow: "bg-purple-500/10 group-hover:bg-purple-500/25",
      border: "hover:border-purple-500/40",
      link: "text-purple-300 group-hover:text-purple-200",
      bar: "from-purple-500 to-fuchsia-500",
    },
  },
  {
    id: 2,
    title: "Professional Projects",
    description:
      "Projects completed through internships, professional work, and real-world development experience.",
    icon: <FaBriefcase />,
    link: "/projects/professional",
    button: "View professional projects",
    accent: {
      icon: "from-indigo-500/25 to-blue-500/20 text-indigo-300",
      glow: "bg-indigo-500/10 group-hover:bg-indigo-500/25",
      border: "hover:border-indigo-500/40",
      link: "text-indigo-300 group-hover:text-indigo-200",
      bar: "from-indigo-500 to-blue-400",
    },
  },
  {
    id: 3,
    title: "Course Projects",
    description:
      "Assignments and practice work from the courses I'm taking, built while learning new tools step by step.",
    icon: <FaGraduationCap />,
    link: "/projects/course",
    button: "View course projects",
    accent: {
      icon: "from-emerald-500/25 to-teal-500/20 text-emerald-300",
      glow: "bg-emerald-500/10 group-hover:bg-emerald-500/25",
      border: "hover:border-emerald-500/40",
      link: "text-emerald-300 group-hover:text-emerald-200",
      bar: "from-emerald-500 to-teal-400",
    },
  },
];

export const ProjectPage = () => {
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
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0, 40, 0],
          y: [0, 25, 0, -25, 0],
          scale: [1, 0.9, 1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <ProjectsHeaderAnimation>
          <div className="mb-14 max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              My projects
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg">
              Pick a folder to browse: things I built for fun, work I did
              professionally, and assignments from my courses.
            </p>
          </div>
        </ProjectsHeaderAnimation>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectCategories.map((category, index) => (
            <ProjectCardAnimation key={category.id} delay={index * 0.2}>
              <Link
                to={category.link}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 sm:p-8 ${category.accent.border}`}
              >
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition duration-500 ${category.accent.glow}`}
                />

                <div className="relative flex flex-1 flex-col">
                  <ProjectIconAnimation>
                    <div
                      className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl ${category.accent.icon}`}
                    >
                      {category.icon}
                    </div>
                  </ProjectIconAnimation>

                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.25 }}
                    className="text-2xl font-bold text-white"
                  >
                    {category.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.35 }}
                    className="mt-4 text-sm leading-7 text-gray-400"
                  >
                    {category.description}
                  </motion.p>

                  <ProjectLinkAnimation>
                    <span
                      className={`mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors duration-300 ${category.accent.link}`}
                    >
                      {category.button}
                      <FaArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </ProjectLinkAnimation>
                </div>

                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                  style={{ transformOrigin: "left" }}
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${category.accent.bar}`}
                />
              </Link>
            </ProjectCardAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};
