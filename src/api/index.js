import api from './axios';
import {getToken} from '../utils/asynStorage';
import GroupMembers from '../screens/GroupMembers';

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

export const addGroup = async (name, members) => {
  const userToken = await getToken();
  const response = await api.post(
    '/api/group/',
    {
      name: name,
      members: members,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
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
  const response = api.post(
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

export const searchUsers = async searchTerm => {
  const userToken = await getToken();
  const response = await api.get('/api/search/' + searchTerm, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
};

export const groupMembers = async groupId => {
  const userToken = await getToken();
  const response = await api.get('/api/user/' + groupId, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
};

export const addMember = async (groupId, userId) => {
  console.log(groupId);
  console.log(userId);
  const userToken = await getToken();
  const response = await api.post(
    '/api/user/' + groupId,
    {
      _id: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  return response;
};
