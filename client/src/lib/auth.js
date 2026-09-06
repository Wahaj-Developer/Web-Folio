import api, { authAPI } from './api';

export const isAuthenticated = async () => {
  try {
    const response = await authAPI.getMe();
    return response.data.success;
  } catch {
    return false;
  }
};

export const getAuthStatus = async () => {
  try {
    const response = await authAPI.getMe();
    if (response.data.success) {
      return { authenticated: true, admin: response.data.data };
    }
    return { authenticated: false, admin: null };
  } catch {
    return { authenticated: false, admin: null };
  }
};

export const login = async (email, password) => {
  const response = await authAPI.login(email, password);
  return response.data;
};

export const logout = async () => {
  await authAPI.logout();
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
