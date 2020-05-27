import api from './axios';

export const signIn = async (email, password) => {
  const response = await api.post('/api/auth/login', {
    email: email,
    password: password,
  });
  return response;
};

export const signUp = async (name, email, password) => {
  const response = await api.post('/api/auth/register', {
    name: name,
    email: email,
    password: password,
  });
  return response;
};
