import { FaCode, FaRobot } from "react-icons/fa";

export const Services = () => {
  return (
    <section className="min-h-screen text-white px-4 sm:px-6 lg:px-10 py-12">

      <div className="flex justify-center text-center font-bold">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight">
          Look at my{" "}
          <span className="ml-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            services
          </span>
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center text-center text-gray-400 mt-6 sm:mt-8 px-2">
        <p className="text-sm sm:text-base leading-7">
          I build modern full-stack web applications using the MERN stack
          with clean, scalable,
        </p>

        <p className="text-sm sm:text-base leading-7">
          and responsive solutions tailored for real-world needs.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 lg:mt-14">

        <div
          className="
            group
            relative
            w-full
            max-w-[320px]
            sm:w-[270px]
            h-[300px]
            bg-[#1f1f1f]
            border border-white/10
            rounded-2xl
            flex flex-col
            items-center
            justify-center
            text-center
            px-5
            overflow-hidden
            transition-all
            duration-500
            hover:-translate-y-3
            hover:border-purple-500/40
            hover:shadow-[0_15px_50px_rgba(168,85,247,0.15)]
          "
        >

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-500" />

          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
            <FaCode className="text-3xl text-purple-400" />
          </div>

          <h2 className="relative font-semibold text-xl sm:text-2xl">
            Full Stack MERN
          </h2>

          <p className="relative text-gray-400 mt-3 text-sm leading-6">
            Building scalable full-stack web applications using MongoDB,
            Express.js, React.js, and Node.js with clean code and modern UI.
          </p>

          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-500" />

        </div>


        <div
          className="
            group
            relative
            w-full
            max-w-[320px]
            sm:w-[270px]
            h-[300px]
            bg-[#1f1f1f]
            border border-white/10
            rounded-2xl
            flex flex-col
            items-center
            justify-center
            text-center
            px-5
            overflow-hidden
            transition-all
            duration-500
            hover:-translate-y-3
            hover:border-pink-500/40
            hover:shadow-[0_15px_50px_rgba(236,72,153,0.15)]
          "
        >

          <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl group-hover:bg-pink-600/20 transition-all duration-500" />

          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-pink-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
            <FaRobot className="text-3xl text-pink-400" />
          </div>

          <h2 className="relative font-semibold text-xl sm:text-2xl">
            AI-Driven Full Stack
          </h2>

          <div className="relative mt-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Coming Soon...
            </span>
          </div>

          <p className="relative text-gray-500 mt-4 text-sm leading-6">
            Exploring AI-powered solutions and intelligent full-stack
            applications.
          </p>

          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500" />

        </div>

      </div>

    </section>
  );
};