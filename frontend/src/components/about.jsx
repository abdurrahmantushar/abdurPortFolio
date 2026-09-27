import { FaCode, FaBriefcase, FaArrowRight, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Axios } from "../common/Axios";
import { SummaryApi } from "../common/Summry_api.js";
import AnimatedCounter from "../animations/AnimatedCounter";
import {
  AboutLeftAnimation,
  AboutRightAnimation,
  AboutCardAnimation,
  AboutGlowAnimation,
} from "../animations/AboutAnimation";

export const About = () => {
  const [about, setAbout] = useState(null);
  const [projectCount, setProjectCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [introDescription, setIntroDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [experienceCount, setExperienceCount] = useState("");
  const [experienceLabel, setExperienceLabel] = useState("");
  const [opportunityTitle, setOpportunityTitle] = useState("");
  const [opportunityDescription, setOpportunityDescription] = useState("");
  const [opportunityButton, setOpportunityButton] = useState("");
  const [deleteFolderId, setDeleteFolderId] = useState(null);

  const handleAbout = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.about,
      });

      if (res.data.success) {
        setAbout(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProjects = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.project,
      });

      if (res.data.success) {
        setProjectCount(res.data.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAbout = async (e) => {
    e.preventDefault();

    if (!about?._id) {
      console.log("About data not found");
      return;
    }

    try {
      const res = await Axios({
        url: `/api/about/${about._id}`,
        method: "put",
        data: {
          name,
          lastName,
          role,
          introDescription,
          whoIAm: {
            title: about.whoIAm?.title || "Who I Am",
            description: description1,
          },
          myGoal: {
            title: about.myGoal?.title || "My Goal",
            description: description2,
          },
          experienceCount,
          experienceLabel,
          opportunityTitle,
          opportunityDescription,
          opportunityButton,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAbout(res.data.data);
        setEditOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setName(about?.name || "");
    setLastName(about?.lastName || "");
    setRole(about?.role || "");
    setIntroDescription(about?.introDescription || "");
    setDescription1(about?.whoIAm?.description || "");
    setDescription2(about?.myGoal?.description || "");
    setExperienceCount(about?.experienceCount || "");
    setExperienceLabel(about?.experienceLabel || "");
    setOpportunityTitle(about?.opportunityTitle || "");
    setOpportunityDescription(about?.opportunityDescription || "");
    setOpportunityButton(about?.opportunityButton || "");
    setEditOpen(true);
  };

  useEffect(() => {
    handleAbout();
    handleProjects();

    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-purple-950 px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <AboutGlowAnimation>
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />
      </AboutGlowAnimation>

      <AboutGlowAnimation>
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />
      </AboutGlowAnimation>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            About Me
          </p>

          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Building modern web experiences with{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              purpose & passion.
            </span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <AboutLeftAnimation className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm lg:p-8">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 text-purple-400">
                <FaCode size={22} />
              </div>

              <p className="mb-3 text-sm font-medium text-gray-400">
                {about?.role?.toUpperCase()}
              </p>

              <h3 className="text-3xl font-bold leading-tight sm:text-4xl">
                {about?.name?.toUpperCase()}
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {about?.lastName?.toUpperCase()}
                </span>
              </h3>

              <div className="mt-8 h-px w-full bg-white/10" />

              <p className="mt-6 text-sm leading-7 text-gray-400">
                {about?.introDescription}
              </p>
            </div>
          </AboutLeftAnimation>

          <AboutRightAnimation className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm lg:p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-purple-400">
                    {about?.whoIAm?.title || "Who I Am"}
                  </span>

                  <p className="text-sm leading-7 text-gray-300">
                    {about?.whoIAm?.description}
                  </p>
                </div>

                <div>
                  <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-pink-400">
                    {about?.myGoal?.title || "My Goal"}
                  </span>

                  <p className="text-sm leading-7 text-gray-300">
                    {about?.myGoal?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-7 sm:max-w-md">
                <AboutCardAnimation delay={0.1}>
                  <div className="rounded-2xl bg-white/[0.04] p-5">
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter
                        value={projectCount}
                        suffix="+"
                      />
                    </div>

                    <div className="mt-1 text-xs font-medium text-gray-500">
                      Projects Done
                    </div>
                  </div>
                </AboutCardAnimation>

                <AboutCardAnimation delay={0.2}>
                  <div className="rounded-2xl bg-white/[0.04] p-5">
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter
                        value={about?.experienceCount}
                      />
                    </div>

                    <div className="mt-1 text-xs font-medium text-gray-500">
                      {about?.experienceLabel}
                    </div>
                  </div>
                </AboutCardAnimation>
              </div>
            </div>
          </AboutRightAnimation>
        </div>

        <AboutCardAnimation delay={0.2}>
          <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-purple-500/10 bg-purple-500/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <FaBriefcase />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {about?.opportunityTitle}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {about?.opportunityDescription}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 text-sm font-semibold text-purple-400 transition hover:text-pink-400"
            >
              {about?.opportunityButton}
              <FaArrowRight size={12} />
            </button>
          </div>
        </AboutCardAnimation>

        {isAdmin && about && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-500"
            >
              <FaEdit size={12} />
              Edit About
            </button>
          </div>
        )}
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Edit About
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your about information
              </p>
            </div>

            <form onSubmit={handleUpdateAbout} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Role
                </label>

                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Intro Description
                </label>

                <textarea
                  value={introDescription}
                  onChange={(e) => setIntroDescription(e.target.value)}
                  rows="3"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Description 1
                </label>

                <textarea
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                  rows="5"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Description 2
                </label>

                <textarea
                  value={description2}
                  onChange={(e) => setDescription2(e.target.value)}
                  rows="5"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Experience Count
                  </label>

                  <input
                    type="text"
                    value={experienceCount}
                    onChange={(e) => setExperienceCount(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Experience Label
                  </label>

                  <input
                    type="text"
                    value={experienceLabel}
                    onChange={(e) => setExperienceLabel(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Opportunity Title
                </label>

                <input
                  type="text"
                  value={opportunityTitle}
                  onChange={(e) => setOpportunityTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Opportunity Description
                </label>

                <textarea
                  value={opportunityDescription}
                  onChange={(e) =>
                    setOpportunityDescription(e.target.value)
                  }
                  rows="3"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Opportunity Button
                </label>

                <input
                  type="text"
                  value={opportunityButton}
                  onChange={(e) => setOpportunityButton(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
                >
                  Update About
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};