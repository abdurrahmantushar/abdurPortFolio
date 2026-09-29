import {
  FaGithub,
  FaArrowRight,
  FaDownload,
  FaEdit,
} from "react-icons/fa";
import { Axios } from "../common/Axios";
import { SummaryApi } from "../common/Summry_api.js";
import { useEffect, useState } from "react";
import SlideUp from "../animations/SlideUp";
import ScaleIn from "../animations/ScaleIn";
import StaggerItem from "../animations/StaggerItem";
import FloatingGlow from "../animations/FloatingGlow";
import StaggerContainer from "../animations/StraggerContainer.jsx";
import Parallax from "../animations/Parallalx.jsx";

export const Body = () => {
  const [hero, setHero] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [specializingIn, setSpecializingIn] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

  const handleHero = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.hero,
      });

      console.log("Hero response:", res.data);

      if (res.data.success) {
        setHero(res.data.data);
      }
    } catch (error) {
      console.log("Hero error:", error);
    } 
  };

  const handleUpdateHero = async (e) => {
    e.preventDefault();

    if (!hero?._id) {
      console.log("Hero data not found");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("description", description);
      formData.append("specializingIn", specializingIn);
      formData.append("badgeText", badgeText);

      if (image) {
        formData.append("image", image);
      }

      const res = await Axios({
        ...SummaryApi.hero,
        url: `/api/hero/${hero._id}`,
        method: "put",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setHero(res.data.data);
        setEditOpen(false);
        setDescription("");
        setSpecializingIn("");
        setBadgeText("");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleHero();

    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");

    console.log("role:", role);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 py-16 text-white sm:px-8 md:px-12 lg:px-20 xl:px-24"
    >
      <FloatingGlow duration={9} distance={30}>
        <div className="absolute left-[-180px] top-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </FloatingGlow>

      <FloatingGlow duration={11} distance={25}>
        <div className="absolute bottom-0 right-[-150px] h-96 w-96 rounded-full bg-pink-600/10 blur-3xl" />
      </FloatingGlow>

      <div className="relative mx-auto flex min-h-[calc(100vh-112px)] max-w-7xl flex-col items-center justify-center gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <SlideUp>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 shadow-lg shadow-purple-900/10">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/50" />

              <span className="text-xs font-medium text-purple-200 sm:text-sm">
                Available for Web Development
              </span>
            </div>
          </SlideUp>

          <div>
            <SlideUp delay={0.1}>
              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Abdur
                </span>
              </h1>
            </SlideUp>

            <SlideUp delay={0.2}>
              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
                Full Stack MERN
              </h1>
            </SlideUp>

            <SlideUp delay={0.3}>
              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-gray-300 sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
                Developer
              </h1>
            </SlideUp>
          </div>

          <SlideUp delay={0.4}>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base lg:max-w-xl">
              {hero?.description}
            </p>
          </SlideUp>

          <StaggerContainer delay={0.15}>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <StaggerItem>
                <a
                  href="#projects"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  View My Projects

                  <FaArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href="#resume"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/10 hover:text-white"
                >
                  <FaDownload size={12} />
                  View Resume
                </a>
              </StaggerItem>
            </div>
          </StaggerContainer>

          <StaggerContainer delay={0.2}>
            <div className="mt-9 flex items-center justify-center gap-5 lg:justify-start">
              <StaggerItem>
                <a
                  href="https://github.com/abdurrahmantushar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white"
                >
                  <FaGithub size={18} />
                </a>
              </StaggerItem>

              <StaggerItem>
                <div className="h-8 w-px bg-white/10" />
              </StaggerItem>

              <StaggerItem>
                <div className="text-left">
                  <p className="text-xs text-gray-500">
                    Based in
                  </p>

                  <p className="text-sm font-medium text-gray-300">
                    Chattogram, Bangladesh
                  </p>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>

        <Parallax distance={45}>
          <div className="relative flex flex-1 justify-center lg:justify-end">
            <FloatingGlow duration={7} distance={15}>
              <div className="absolute h-64 w-64 rounded-full bg-purple-600/20 blur-3xl sm:h-80 sm:w-80" />
            </FloatingGlow>

            <ScaleIn delay={0.3} duration={0.9}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-r from-pink-500/20 via-purple-500/30 to-indigo-500/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-purple-950/30 backdrop-blur-sm">
                {imageLoading && (
                  <div className="absolute inset-2 z-10 flex items-center justify-center rounded-[1.5rem] bg-gray-950">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />

                      <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500/20 border-t-purple-400" />

                      <div className="absolute h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.9)]" />
                    </div>
                  </div>
                )}

                <img
                  src={hero?.image}
                  alt="Abdur Rahman"
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                  className="h-[350px] w-[280px] rounded-[1.5rem] object-cover transition duration-700 hover:scale-105 sm:h-[420px] sm:w-[330px] lg:h-[460px] lg:w-[360px]"
                />
              </div>

                <FloatingGlow duration={6} distance={12}>
                  <div className="absolute -bottom-7 -left-7 z-20 sm:-left-10">
                    <div className="relative overflow-hidden rounded-2xl border border-purple-400/20 bg-[#0b0b0f]/90 px-4 py-3 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10">
                          <div className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-lg shadow-purple-500/70" />
                        </div>

                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                            Specializing In
                          </p>

                          <p className="mt-1 text-sm font-semibold text-white">
                            {hero?.specializingIn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FloatingGlow>

                <div className="absolute -right-3 -top-4 z-20 sm:-right-6 sm:-top-5">
                  <FloatingGlow duration={4} distance={8}>
                    <div className="rounded-2xl border border-pink-400/30 bg-[#09090d]/95 px-4 py-2.5 shadow-2xl shadow-pink-500/20 backdrop-blur-xl">
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute h-full w-full animate-ping rounded-full bg-pink-400 opacity-60" />
                          <span className="relative h-2.5 w-2.5 rounded-full bg-pink-400 shadow-lg shadow-pink-500/70" />
                        </span>

                        <span className="text-xs font-semibold tracking-wide text-pink-100">
                          {hero?.badgeText}
                        </span>
                      </div>
                    </div>
                  </FloatingGlow>
                </div>

                {isAdmin && hero && (
                  <SlideUp delay={0.9}>
                    <button
                      type="button"
                      onClick={() => {
                        setDescription(hero.description || "");
                        setSpecializingIn(hero.specializingIn || "");
                        setBadgeText(hero.badgeText || "");
                        setImage(null);
                        setEditOpen(true);
                      }}
                      className="absolute -bottom-16 right-0 flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-1 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <FaEdit size={12} />
                      Edit Hero
                    </button>
                  </SlideUp>
                )}
              </div>
            </ScaleIn>
          </div>
        </Parallax>
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                  Admin
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  Edit Hero
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="text-xl text-gray-400 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleUpdateHero}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="5"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Specializing In
                </label>

                <input
                  type="text"
                  value={specializingIn}
                  onChange={(e) => setSpecializingIn(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Badge Text
                </label>

                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Current Image
                </label>

                <img
                  src={hero?.image}
                  alt="Hero"
                  className="mb-4 h-40 w-full rounded-xl object-cover"
                />

                <label className="mb-2 block text-sm text-gray-300">
                  New Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files[0])
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  Update Hero
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};