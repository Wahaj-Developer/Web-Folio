import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
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
  // Legacy path: routes the file through our own API. Works fine locally,
  // but on Vercel this endpoint is a serverless function with a hard
  // 4.5MB request body limit imposed by the platform itself, so larger
  // videos fail with a 413 (which the browser reports as a CORS error,
  // since the platform-level rejection happens before our CORS headers
  // are attached). Kept only for small files / local dev.
  uploadVideo: (file) => {
    const formData = new FormData();
    formData.append('video', file);
    return api.post('/projects/upload-video', formData);
  },
  // Direct-to-Cloudinary upload: the video bytes never touch our API, so
  // Vercel's 4.5MB serverless body limit never applies. Use this one.
  uploadVideoDirect: async (file, onProgress) => {
    const { data } = await api.get('/projects/video-upload-signature');
    const { timestamp, signature, folder, apiKey, cloudName } = data.data;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    const response = await axios.post(uploadUrl, formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });

    return {
      data: {
        success: true,
        data: {
          url: response.data.secure_url,
          publicId: response.data.public_id,
        },
        message: 'Video uploaded successfully',
      },
    };
  },
};

export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  delete: (id) => api.delete(`/contact/${id}`),
  getCount: () => api.get('/contact/count'),
};