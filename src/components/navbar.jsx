import React, { useState } from "react";
import { IoMdContact } from "react-icons/io";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // close mobile menu after click
  };

  return (
    <>
      <nav className="w-full bg-black h-[60px] flex items-center px-6 fixed top-0 left-0 z-50 shadow-md">
        {/* Logo */}
        <div className="text-white text-xl flex gap-1 sm:text-[18px] md:text-[18px] items-center">
          <RiContactsFill className="mt-1 text-2xl sm:text-[18px] md:text-[18px]" />
          My Folio
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex flex-1 justify-center gap-10 text-white items-center">
          <li className="text-3xl cursor-pointer" onClick={() => scroll("home")}>
            <FaHome className="mt-1" />
          </li>
          <li className="text-xl cursor-pointer" onClick={() => scroll("about")}>
            About
          </li>
          <li className="text-xl cursor-pointer" onClick={() => scroll("project")}>
            Projects
          </li>
          <li className="text-xl cursor-pointer" onClick={() => scroll("services")}>
            Services
          </li>
          <li className="text-xl cursor-pointer" onClick={() => scroll("resume")}>
            Resume
          </li>
        </ul>

        {/* Contact Button Desktop */}
        <div className="hidden lg:flex">
          <button
            className="text-white bg-slate-800 rounded-2xl px-6 py-2 flex items-center gap-2 hover:bg-slate-700 transition"
            onClick={() => scroll("contact")}
          >
            <IoMdContact />
            <span className="text-sm">Contact Me</span>
          </button>
        </div>

        {/* Hamburger Menu Mobile */}
        <div className="lg:hidden text-white text-2xl ml-auto" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black text-white flex flex-col gap-4 px-6 py-4 fixed top-[60px] w-full z-40">
          <li className="cursor-pointer list-none" onClick={() => scroll("home")}>
            Home
          </li>
          <li className="cursor-pointer list-none" onClick={() => scroll("about")}>
            About
          </li>
          <li className="cursor-pointer list-none" onClick={() => scroll("project")}>
            Projects
          </li>
          <li className="cursor-pointer list-none" onClick={() => scroll("services")}>
            Services
          </li>
          <li className="cursor-pointer list-none" onClick={() => scroll("resume")}>
            Resume
          </li>
          <button
            className="text-white bg-slate-800 rounded-2xl px-6 py-2 flex items-center gap-2 hover:bg-slate-700 transition w-full"
            onClick={() => scroll("contact")}
          >
            <IoMdContact />
            <span className="text-sm">Contact Me</span>
          </button>
        </div>
      )}
    </>
  );
};
