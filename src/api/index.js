import api from './axios';
import {getToken} from '../utils/asynStorage';

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

export const event = async () => {
  const userToken = await getToken();
  const response = await api.get('/api/event', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
};

export const oneEvent = async eventId => {
  const userToken = await getToken();
  const response = await api.get('/api/event/' + eventId, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
};

export const updateResponse = async (eventId, userResponse) => {
  const userToken = await getToken();
  const response = api({
    method: 'PATCH',
    url: `api/event/${eventId}/${userResponse}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
};

export const group = async () => {
  const userToken = await getToken();
  const response = await api.get('/api/group', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
};

export const createEvent = async (
  name,
  schedule,
  latitude,
  longitude,
  locationName,
  description,
  groupId,
) => {
  const userToken = await getToken();
  const response = await api.post(
    '/api/event',
    {
      name,
      schedule,
      latitude,
      longitude,
      locationName,
      description,
      group: groupId,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  return response;
};
