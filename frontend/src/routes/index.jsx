import { createBrowserRouter } from "react-router-dom";

import { PersonalProject } from "../components/projects/personalProject";
import { ProfessionalProject } from "../components/projects/professionalProject";
import { ProjectPage } from "../components/projects";
import App from "../App";
import ProjectLayout from "../components/projects/projectLayout";
import AdminLogin from "../common/AdminLogin";
import ProfessionalProjectDetails from "../components/projects/ProfessionalProjectDeatils";

export const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>
  },
  {
    element : <ProjectLayout/>,
    children:[
      {
        path: "/projects",
        element: <ProjectPage />,
      },
      {
        path: "/projects/personal",
        element: <PersonalProject />,
      },
      {
        path: "/projects/professional/:folderId",
        element: <ProfessionalProjectDetails />,
      },
      {
        path: "/projects/professional",
        element: <ProfessionalProject />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
    ]
  },
]);