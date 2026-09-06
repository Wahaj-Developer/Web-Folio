import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
        message: error.response.data?.message || 'An error occurred',
      });
    }
    return Promise.reject({
      status: 500,
      message: 'Network error, please try again',
    });
  }
);

export default api;

// API helpers
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getBySlug: (slug) => api.get(`/posts/slug/${slug}`),
  getAdminAll: (params) => api.get('/posts/admin', { params }),
  getAdminById: (id) => api.get(`/posts/admin/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.patch(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/posts/upload-image', formData);
  },
};

export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  getAdminAll: () => api.get('/projects/admin/all'),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.patch(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/projects/upload-image', formData);
  },
  uploadVideo: (file) => {
    const formData = new FormData();
    formData.append('video', file);
    return api.post('/projects/upload-video', formData);
  },
};

export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  delete: (id) => api.delete(`/contact/${id}`),
  getCount: () => api.get('/contact/count'),
};