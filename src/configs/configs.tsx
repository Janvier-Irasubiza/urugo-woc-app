const API_BASE_URL = import.meta.env.VITE_API_URL;
const ABT_BASE_URL = import.meta.env.VITE_API_ABT_URL;

export const API_ENDPOINTS = {
  BLOG_POSTS: `${API_BASE_URL}/blog-posts`,
  PARTNERS: `${API_BASE_URL}/partners`,
  DINING: `${API_BASE_URL}/dining`,
  LISTINGS: `${API_BASE_URL}/listings`,
  ABOUT: `${API_BASE_URL}/about`,
  CONTACT: `${API_BASE_URL}/contact`,
  TEAM: `${API_BASE_URL}/team`,
  REGISTER: `${API_BASE_URL}/register`,
  LOGIN: `${API_BASE_URL}/login`,
  LOGOUT: `${API_BASE_URL}/logout`,
};

export const ABT_ENDPOINTS = {
  ABOUT: `${ABT_BASE_URL}/about`,
  TEAM: `${ABT_BASE_URL}/team`,
  CONTACT: `${ABT_BASE_URL}/contact`,
};

export function getCsrfToken() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("csrftoken=")) {
      return cookie.split("=")[1];
    }
  }
  return "";
}

export { API_BASE_URL, ABT_BASE_URL };