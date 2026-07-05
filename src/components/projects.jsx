import { CgDanger } from "react-icons/cg";
import picture2 from "../assets/picture2.png";

export const Projects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white pt-8 font-mono">

      <h1 className="lg:text-3xl text-xl font-bold mb-12 flex items-center gap-2 px-5">
        <CgDanger className="w-8 h-8" />
        Featured Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 justify-items-center">

        {/* Project Card */}
        <div className="w-full max-w-[350px] bg-white rounded-xl p-4 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">

          <img
            src={picture2}
            alt="project"
            className="w-full h-48 object-cover rounded-lg"
          />

          <h2 className="mt-4 font-semibold text-black text-xl">
            Full Stack E-Commerce Platform
          </h2>

          <p className="text-sm text-gray-600 mt-3 leading-6 flex-grow">
            A modern MERN e-commerce application featuring user authentication,
            REST API integration, product management, shopping cart
            functionality, and a responsive user interface built with React.js.
          </p>

          <div className="flex gap-3 mt-6">

            <a
              href="https://abdur-e-commerce-1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              Live Demo
            </a>

            <a
              href="https://github.com/abdurrahmantushar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border border-black text-black py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition"
            >
              GitHub
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};
