import { CgDanger } from "react-icons/cg";
import picture2 from '../assets/picture2.png';

export const Projects = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white pt-8 font-mono">




            <h1 className="lg:text-3xl text-x font-bold mb-12 flex items-center gap-2">
                <CgDanger className="w-8 h-8" />
                I’ve created 10+ practice projects, and I’ll be deploying them one by one very soon.
            </h1>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

                <div className="break-inside-avoid h-[350px] ml-5 w-[250px] lg:h-[370px] lg:ml-5 lg:w-[350px] bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition">
                    <img src={picture2} className="rounded-lg h-[150px] w-[200px] lg:h-[200px] lg:w-[300px]" alt="project" />

                    <h2 className="mt-4 font-semibold">E-Commerce UI</h2>

                    <p className="text-sm mt-2 text-gray-600">
                        Fully responsive shop UI with filtering, pagination, API data, and dynamic components.
                    </p>

                    <a
                        href="https://abdurpractice.netlify.app/"
                        target="_blank"
                        className="mt-3 inline-block px-3 py-1 bg-black text-white rounded-md text-sm"
                    >
                        Live Preview
                    </a>
                </div>

            </div>
        </div>
    );
};
