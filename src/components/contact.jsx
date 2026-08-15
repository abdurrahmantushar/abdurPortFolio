import { HiOutlineMail, HiOutlineGlobeAlt } from "react-icons/hi";
import { FaGithubSquare, FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export const Contact = () => {
  return (
    <footer className="min-h-[305px] bg-black text-white font-mono px-5 sm:px-8 lg:px-10 py-8">

      <h1 className="text-xs sm:text-sm text-gray-400 tracking-wider">
        Contact Details
      </h1>

      <div className="mt-8">

        <p className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-300">
          <HiOutlineMail className="text-lg flex-shrink-0" />
          <span className="break-all">
            Email: abdurrahmantushar0@gmail.com
          </span>
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 mt-6 text-sm">

          <a
            href="https://abdur-folio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <HiOutlineGlobeAlt className="text-lg" />
            Portfolio
          </a>

          <a
            href="https://github.com/abdurrahmantushar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaGithubSquare className="text-lg" />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/abdur-rahman-tushar-x/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <CiLinkedin className="text-xl" />
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/abdur_rahman_tushar_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaInstagram className="text-lg" />
            Instagram
          </a>

        </div>

        <p className="flex justify-center mt-5 text-sm text-gray-400">
          Phone: +880 189 013 0921
        </p>

      </div>

      <div className="border-t border-gray-800 mt-8" />

      <div className="flex justify-center text-center mt-5">
        <p className="text-xs sm:text-sm text-gray-500">
          © 2026 Abdur Rahman Tushar. Built with React & Tailwind CSS.
        </p>
      </div>

    </footer>
  );
};