import React, {useState, useEffect, createContext} from 'react';
import AppDrawer from './AppDrawer';
import AuthStack from './AuthStack';
import {getToken, getUser} from '../utils/asynStorage';
export const UserContext = createContext({});

const AppNavigator = () => {
  const [user, setUser] = useState(false);

  const checkAsyncStorage = async () => {
    const token = await getToken();
    if (token) {
      const user = await getUser();
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    }
  };

  useEffect(() => {
    checkAsyncStorage();
  }, []);

  if (user) {
    return (
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}>
        <AppDrawer />
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}>
        <AuthStack />
      </UserContext.Provider>
    );
  }
};

export default AppNavigator;
