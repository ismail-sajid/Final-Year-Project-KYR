// API Configuration
// This file centralizes all API endpoint configuration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Helper function to build API URLs
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // If API_BASE_URL is set, use it; otherwise use relative URLs (for Vite proxy)
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
  return `/${cleanEndpoint}`;
};

// API Endpoints
export const API_ENDPOINTS = {
  // Prompt processing
  PROCESS_PROMPT: getApiUrl('/'),
  
  // Authentication
  LOGIN: getApiUrl('/login'),
  SIGNUP: getApiUrl('/signup'),
  
  // Posts
  HIGHLIGHTED_POSTS: getApiUrl('/highlighted'),
  ALL_POSTS: getApiUrl('/all-posts'),
  USER_POSTS: getApiUrl('/user-posts'),
  POST_ABOUT_THIS: getApiUrl('/post-about-this'),
  DELETE_POST: getApiUrl('/delete-post'),
  
  // User
  FIRST_NAME: getApiUrl('/first-name'),
  CHANGE_PASSWORD: getApiUrl('/change-password'),
  
  // Likes
  POST_LIKED: getApiUrl('/post-liked'),
  POST_DISLIKED: getApiUrl('/post-disliked'),
  CHECK_LIKES: getApiUrl('/check-likes'),
  
  // Comments
  COMMENT_ON_POST: getApiUrl('/comment-on-post'),
  FETCH_COMMENT_POSTS: getApiUrl('/fetch-comment-posts'),
  CAN_DELETE: getApiUrl('/can-delete'),
  DELETE_COMMENT: getApiUrl('/delete-comment'),
  
  // Lawyers
  LAWYERS: getApiUrl('/lawyers'),
  
  // Contact
  CONTACT_FORM: getApiUrl('/contact-form'),
};

// Helper function for making API requests
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = endpoint.startsWith('http') ? endpoint : getApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return fetch(url, defaultOptions);
};

