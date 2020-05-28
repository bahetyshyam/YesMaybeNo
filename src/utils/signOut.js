import {removeToken, removeUser} from '../utils/asynStorage';

export const signOut = setUser => {
  removeToken();
  removeUser();
  setUser(false);
};
