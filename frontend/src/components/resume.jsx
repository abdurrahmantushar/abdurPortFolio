import {
  FaFileAlt,
  FaGraduationCap,
  FaCode,
  FaBolt,
  FaBookOpen,
  FaLanguage,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Axios } from "../common/Axios";
import { SummaryApi } from "../common/Summry_api.js";
import {
  TimelineAnimation,
  ResumeItemAnimation,
  SkillAnimation,
} from "../animations/ResumeAnimation";

const resumeData = {
  header: {
    title: "My Resume",
    subtitle:
      "A quick overview of my education, technical skills, and strengths.",
  },

  summary: {
    title: "About Me",
    content: [
      "I am a passionate Full Stack MERN Developer focused on building modern, responsive, and user-friendly web applications.",
      "I enjoy solving real-world problems with clean code, scalable APIs, and modern frontend technologies.",
    ],
  },

  strengths: [
    {
      id: 1,
      title: "Problem Solving",
      description:
        "I enjoy breaking complex problems into simple and practical solutions.",
    },
    {
      id: 2,
      title: "Full Stack Development",
      description:
        "I can build responsive frontend interfaces and backend APIs using modern JavaScript technologies.",
    },
    {
      id: 3,
      title: "Continuous Learning",
      description:
        "I continuously explore new technologies and improve my development skills through real-world projects.",
    },
  ],
};

const SectionHeading = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-purple-500/20">
        <Icon className="text-purple-400 text-lg" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-white">
        {title}
      </h2>
    </div>

    {subtitle && (
      <p className="text-sm text-gray-500 ml-0 md:ml-[52px]">
        {subtitle}
      </p>
    )}
  </div>
);

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
    {children}
  </span>
);

export const Resume = () => {
  const [education, setEducation] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [resumeEditorOpen, setResumeEditorOpen] = useState(false);

  const [educationForm, setEducationForm] = useState({
    degree: "",
    period: "",
    institution: "",
  });

  const [editingEducation, setEditingEducation] = useState(null);

  const [skillName, setSkillName] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillType, setSkillType] = useState("technical");

  const handleResumeData = async () => {
    try {
      const [studyRes, skillRes] = await Promise.all([
        Axios({
          ...SummaryApi.study,
        }),
        Axios({
          ...SummaryApi.skill,
        }),
      ]);

      if (studyRes.data.success) {
        setEducation(studyRes.data.data);
      }

      if (skillRes.data.success) {
        const skills = skillRes.data.data;

        setTechnicalSkills(
          skills.filter((skill) => skill.type === "technical")
        );

        setLanguages(
          skills.filter((skill) => skill.type === "language")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEducationChange = (e) => {
    setEducationForm({
      ...educationForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEducationSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        url: editingEducation
          ? `/api/study/${editingEducation._id}`
          : "/api/study",
        method: editingEducation ? "put" : "post",
        data: educationForm,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setEducationForm({
          degree: "",
          period: "",
          institution: "",
        });

        setEditingEducation(null);

        handleResumeData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditEducation = (item) => {
    setEditingEducation(item);

    setEducationForm({
      degree: item.degree || "",
      period: item.period || "",
      institution: item.institution || "",
    });
  };

  const handleDeleteEducation = async (id) => {
    try {
      const res = await Axios({
        url: `/api/study/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        handleResumeData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();

    if (!skillName.trim()) return;

    try {
      const res = await Axios({
        url: editingSkill
          ? `/api/skill/${editingSkill._id}`
          : "/api/skill",
        method: editingSkill ? "put" : "post",
        data: {
          name: skillName,
          type: skillType,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setSkillName("");
        setSkillType("technical");
        setEditingSkill(null);

        handleResumeData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillName(skill.name);
    setSkillType(skill.type);
  };

  const handleDeleteSkill = async (id) => {
    try {
      const res = await Axios({
        url: `/api/skill/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        handleResumeData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditor = () => {
    setResumeEditorOpen(false);

    setEditingEducation(null);
    setEditingSkill(null);

    setEducationForm({
      degree: "",
      period: "",
      institution: "",
    });

    setSkillName("");
    setSkillType("technical");
  };

  useEffect(() => {
    handleResumeData();

    const role = localStorage.getItem("role");

    setIsAdmin(role === "admin");
  }, []);

  return (
    <section
      id="resume"
      className="relative min-h-screen bg-[#050505] text-white px-4 py-20 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="absolute top-20 left-[-150px] w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="absolute bottom-20 right-[-150px] w-[350px] h-[350px] rounded-full bg-pink-600/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm text-gray-400 mb-5">
            <FaFileAlt className="text-purple-400" />
            My Professional Profile
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            <GradientText>{resumeData.header.title}</GradientText>
          </h1>

          <p className="text-gray-400 text-sm md:text-base leading-7">
            {resumeData.header.subtitle}
          </p>
        </div>

        {isAdmin && (
          <div className="flex justify-center mb-16">
            <button
              type="button"
              onClick={() => setResumeEditorOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              <FaEdit size={13} />
              Edit Resume
            </button>
          </div>
        )}

        <div className="mb-20">
          <SectionHeading
            icon={FaBookOpen}
            title={resumeData.summary.title}
            subtitle="A little introduction about my development journey."
          />

          <div className="grid md:grid-cols-2 gap-5">
            {resumeData.summary.content.map((text, index) => (
              <ResumeItemAnimation key={index} delay={index * 0.15}>
                <div className="p-6 md:p-7 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-xs text-purple-300">
                      0{index + 1}
                    </span>

                    <p className="text-gray-400 text-sm md:text-base leading-7">
                      {text}
                    </p>
                  </div>
                </div>
              </ResumeItemAnimation>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <SectionHeading
            icon={FaGraduationCap}
            title="Education"
            subtitle="My academic background."
          />

          <div className="relative ml-3 md:ml-5">
            <TimelineAnimation>
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-transparent" />
            </TimelineAnimation>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <ResumeItemAnimation
                  key={edu._id}
                  delay={index * 0.2}
                >
                  <div className="relative pl-12">
                    <div className="absolute left-[8px] top-1 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/10" />

                    <div className="p-6 rounded-2xl bg-white/[0.035] border border-white/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                          {edu.degree}
                        </h3>

                        <span className="w-fit px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                          {edu.period}
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm mt-3">
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                </ResumeItemAnimation>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <SectionHeading
            icon={FaCode}
            title="Technical Skills"
            subtitle="Technologies and tools I work with."
          />

          <div className="p-6 md:p-8 rounded-2xl bg-white/[0.035] border border-white/10">
            <div className="flex flex-wrap gap-3">
              {technicalSkills.map((skill, index) => (
                <SkillAnimation
                  key={skill._id}
                  delay={index * 0.08}
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-sm text-gray-300">
                    <FaCheckCircle className="text-purple-400" />
                    {skill.name}
                  </div>
                </SkillAnimation>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <SectionHeading
            icon={FaBolt}
            title="My Strengths"
            subtitle="What I bring to my development work."
          />

          <div className="grid md:grid-cols-3 gap-5">
            {resumeData.strengths.map((strength, index) => (
              <ResumeItemAnimation
                key={strength.id}
                delay={index * 0.15}
              >
                <div className="p-6 md:p-7 rounded-2xl bg-white/[0.035] border border-white/10">
                  <span className="text-xs text-purple-400 font-semibold">
                    0{strength.id}
                  </span>

                  <h3 className="text-lg font-semibold text-white mt-4 mb-3">
                    {strength.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6">
                    {strength.description}
                  </p>
                </div>
              </ResumeItemAnimation>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            icon={FaLanguage}
            title="Languages"
            subtitle="Languages I can communicate with."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((language, index) => (
              <SkillAnimation
                key={language._id}
                delay={index * 0.1}
              >
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.035] border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FaLanguage className="text-purple-400" />
                  </div>

                  <span className="text-sm text-gray-300">
                    {language.name}
                  </span>
                </div>
              </SkillAnimation>
            ))}
          </div>
        </div>
      </div>

      {resumeEditorOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-gray-950 shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-gray-950 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Edit Resume
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your education, skills and languages
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseEditor}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-10 p-6 md:p-8">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Education
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  {education.map((edu) => (
                    <div
                      key={edu._id}
                      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <h4 className="font-semibold text-white">
                          {edu.degree}
                        </h4>

                        <p className="text-sm text-purple-400 mt-1">
                          {edu.period}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditEducation(edu)}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 hover:text-white"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteEducation(edu._id)
                          }
                          className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleEducationSubmit}
                  className="grid md:grid-cols-3 gap-3"
                >
                  <input
                    type="text"
                    name="degree"
                    value={educationForm.degree}
                    onChange={handleEducationChange}
                    placeholder="Degree"
                    required
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                  />

                  <input
                    type="text"
                    name="period"
                    value={educationForm.period}
                    onChange={handleEducationChange}
                    placeholder="Period"
                    required
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                  />

                  <input
                    type="text"
                    name="institution"
                    value={educationForm.institution}
                    onChange={handleEducationChange}
                    placeholder="Institution"
                    required
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                  />

                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-xs font-semibold text-white hover:bg-purple-500"
                    >
                      <FaPlus />
                      {editingEducation
                        ? "Update Education"
                        : "Add Education"}
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-5">
                  Technical Skills
                </h3>

                <div className="flex flex-wrap gap-3 mb-5">
                  {technicalSkills.map((skill) => (
                    <div
                      key={skill._id}
                      className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-sm text-purple-300"
                    >
                      {skill.name}

                      <button
                        type="button"
                        onClick={() => handleEditSkill(skill)}
                        className="ml-1 text-gray-400 hover:text-white"
                      >
                        <FaEdit size={11} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSkillSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    placeholder="Add technical skill"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                  />

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-xs font-semibold text-white hover:bg-purple-500"
                  >
                    <FaPlus />
                    {editingSkill ? "Update" : "Add Skill"}
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-5">
                  Languages
                </h3>

                <div className="flex flex-wrap gap-3 mb-5">
                  {languages.map((language) => (
                    <div
                      key={language._id}
                      className="flex items-center gap-2 rounded-xl border border-pink-500/20 bg-pink-500/10 px-3 py-2 text-sm text-pink-300"
                    >
                      {language.name}

                      <button
                        type="button"
                        onClick={() => handleEditSkill(language)}
                        className="ml-1 text-gray-400 hover:text-white"
                      >
                        <FaEdit size={11} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteSkill(language._id)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSkillSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={
                      editingSkill?.type === "language"
                        ? skillName
                        : ""
                    }
                    onChange={(e) => {
                      setSkillName(e.target.value);
                      setSkillType("language");
                    }}
                    onFocus={() => setSkillType("language")}
                    placeholder="Add language"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                  />

                  <button
                    type="submit"
                    onClick={() => setSkillType("language")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-xs font-semibold text-white hover:bg-pink-500"
                  >
                    <FaPlus />
                    {editingSkill?.type === "language"
                      ? "Update"
                      : "Add Language"}
                  </button>
                </form>
              </div>
            </div>

            <div className="border-t border-white/10 px-6 py-5 md:px-8">
              <button
                type="button"
                onClick={handleCloseEditor}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};