export const BaseUrl = import.meta.env.VITE_API_URL;

export const SummaryApi = {
  adminLogin: {
    url: "/api/admin/login",
    method: "post",
  },
  hero: {
    url: "/api/hero",
    method: "get",
  },

  about: {
    url: "/api/about",
    method: "get",
  },

  study: {
    url: "/api/study",
    method: "get",
  },

  skill: {
    url: "/api/skill",
    method: "get",
  },

  service: {
    url: "/api/service",
    method: "get",
  },

  project: {
    url: "/api/project",
    method: "get",
  },
    projectFolder: {
    url: "/api/project-folder",
    method: "get",
  },
};