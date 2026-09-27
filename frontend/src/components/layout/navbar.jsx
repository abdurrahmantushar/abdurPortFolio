import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import {
  FaHome,
  FaBars,
  FaTimes,
  FaCode,
  FaUserShield,
} from "react-icons/fa";
import {
  MobileMenuAnimation,
  NavbarAnimation,
} from "../../animations/NavbarAnimation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (id) => {
    setIsOpen(false);

    setTimeout(() => {
      const section = document.getElementById(id);

      if (section) {
        const navbarHeight = 70;
        const sectionPosition =
          section.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: sectionPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    }, 350);
  };

  return (
    <>
      <NavbarAnimation scrolled={scrolled}>
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/">
            <button
              onClick={() => scroll("home")}
              className="group flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 transition-all duration-300 group-hover:border-purple-400/40 group-hover:bg-purple-500/20">
                <FaCode className="text-sm text-purple-400" />
              </div>

              <span className="text-lg font-bold tracking-tight text-white">
                My-
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Folio
                </span>
              </span>
            </button>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <Link to="/">
              <button
                onClick={() => scroll("home")}
                className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                <FaHome className="text-purple-400" />
                Home
                <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </Link>

            <button
              onClick={() => scroll("about")}
              className="group relative rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              About
              <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
            </button>

            <Link
              to="/projects"
              className="group relative rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Projects
              <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            <button
              onClick={() => scroll("services")}
              className="group relative rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Services
              <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
            </button>

            <button
              onClick={() => scroll("resume")}
              className="group relative rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Resume
              <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/admin/login"
              className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
            >
              <FaUserShield className="text-purple-400" />
              Admin Login
            </Link>

            <button
              onClick={() => scroll("contact")}
              className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-600/90 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <IoMdContact size={17} />
              Contact Me
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:border-purple-400/30 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </NavbarAnimation>

      <MobileMenuAnimation isOpen={isOpen}>
        <div className="fixed left-0 top-[70px] z-40 w-full border-b border-white/10 bg-black/95 px-5 py-5 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            <button
              onClick={() => scroll("home")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-purple-500/10 hover:text-white"
            >
              <FaHome className="text-purple-400" />
              Home
            </button>

            <button
              onClick={() => scroll("about")}
              className="flex w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-purple-500/10 hover:text-white"
            >
              About
            </button>

            <Link
              to="/projects"
              onClick={() => setIsOpen(false)}
              className="flex w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-purple-500/10 hover:text-white"
            >
              Projects
            </Link>

            <button
              onClick={() => scroll("services")}
              className="flex w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-purple-500/10 hover:text-white"
            >
              Services
            </button>

            <button
              onClick={() => scroll("resume")}
              className="flex w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-400 transition-all duration-300 hover:bg-purple-500/10 hover:text-white"
            >
              Resume
            </button>

            <div className="pt-3">
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/20 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
              >
                <FaUserShield className="text-purple-400" />
                Admin Login
              </Link>

              <button
                onClick={() => scroll("contact")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-500"
              >
                <IoMdContact size={17} />
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </MobileMenuAnimation>
    </>
  );
};