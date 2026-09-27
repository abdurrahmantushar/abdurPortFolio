import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaGithubSquare, FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black px-5 py-10 font-mono text-white sm:px-8 lg:px-10">
      <div className="absolute left-1/4 top-0 h-56 w-56 rounded-full bg-purple-600/10 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-pink-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
                Get In Touch
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Let’s stay connected.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                Feel free to reach out for projects, collaborations,
                opportunities, or just to say hello.
              </p>
            </div>

            <div className="space-y-3 md:justify-self-end md:min-w-[320px]">
              <a
                href="mailto:abdurrahmantushar0@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <HiOutlineMail className="text-xl" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-gray-300 transition-colors duration-300 group-hover:text-white">
                    abdurrahmantushar0@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+8801890130921"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <HiOutlinePhone className="text-xl" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-gray-300 transition-colors duration-300 group-hover:text-white">
                    +880 189 013 0921
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Find Me Online
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/abdurrahmantushar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                >
                  <FaGithubSquare className="text-lg text-purple-400" />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/abdur-rahman-tushar-x/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                >
                  <CiLinkedin className="text-xl text-purple-400" />
                  LinkedIn
                </a>

                <a
                  href="https://www.instagram.com/abdur_rahman_tushar_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                >
                  <FaInstagram className="text-lg text-purple-400" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500 sm:text-sm">
            © 2026 Abdur Rahman Tushar. All rights reserved.
          </p>

          <p className="text-xs text-gray-600">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
