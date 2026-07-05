import { CgDanger } from "react-icons/cg";
import picture2 from '../assets/picture2.png';

export const Projects = () => {
   return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white pt-8 font-mono">

      <h1 className="lg:text-3xl text-xl font-bold mb-12 flex items-center gap-2 px-5">
        <CgDanger className="w-8 h-8" />
        Featured Projects
      </h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 px-5">

        {/* Project Card */}
        <div className="break-inside-avoid h-[430px] w-[250px] lg:h-[470px] lg:w-[350px] bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition duration-300">

          <img
            src={picture2}
            className="rounded-lg h-[150px] w-[200px] lg:h-[200px] lg:w-[300px]"
            alt="project"
          />

          <h2 className="mt-4 font-semibold text-black text-lg">
            Full Stack E-Commerce Platform
          </h2>

          <p className="text-sm mt-2 text-gray-600 leading-6">
            A modern MERN-based e-commerce application featuring responsive UI,
            REST API integration, product browsing, authentication, shopping
            cart functionality, and a clean user experience.
          </p>

          <div className="flex gap-3 mt-5">

            <a
              href="https://abdur-e-commerce-1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
            >
              Live Demo
            </a>

            <a
              href="https://github.com/abdurrahmantushar/abdur.e-commerce"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-black text-black rounded-md text-sm hover:bg-black hover:text-white transition"
            >
              GitHub
            </a>

          </div>

        </div>

      </div>
    </div>
  );
};
