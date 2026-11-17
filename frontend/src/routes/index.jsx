import { createBrowserRouter } from "react-router-dom";

import { PersonalProject } from "../components/projects/personalProject";
import { ProfessionalProject } from "../components/projects/professionalProject";
import { ProjectPage } from "../components/projects";
import App from "../App";
import ProjectLayout from "../components/projects/projectLayout";
import AdminLogin from "../common/AdminLogin";
import ProfessionalProjectDetails from "../components/projects/ProfessionalProjectDeatils";
import { ProjectDetails } from "../components/projects/ProjectDetails";
import PersonalProjectDetails from "../components/projects/PersonalProjectDetails";
import CourseProject from "../components/projects/courseProjects";
import CourseProjectDetails from "../components/projects/courseProjectsDetails";
import CourseFolderDetails from "../components/projects/courseFolderDetails";

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
        path: "/projects/course",
        element: <CourseProject />,
      },
      {
        path: "/projects/professional/:folderId",
        element: <ProfessionalProjectDetails />,
      },
      {
        path: "/projects/course/:folderId",
        element: <CourseFolderDetails/>,
      },

      { path: "/projects/course/:folderId/:projectId", 
        element: <CourseProjectDetails /> 
      },
      {  
        path:"/projects/professional/:folderId/:projectId",
        element :<ProjectDetails/>
      },
      {
        path :"/projects/personal/:projectId",
        element: <PersonalProjectDetails/>
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