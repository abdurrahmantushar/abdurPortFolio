import { Outlet } from "react-router-dom";
import { Navbar } from "../layout/navbar";

const ProjectLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-950 to-black text-white">
      <Navbar />

      <main className="pt-[70px]">
        <Outlet />
      </main>
    </div>
  );
};

export default ProjectLayout;