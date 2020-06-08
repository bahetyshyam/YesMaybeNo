import React, {useState, useEffect, createContext} from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {getToken, getUser} from '../utils/asynStorage';
export const UserContext = createContext({});

const AuthNavigator = () => {
  const [user, setUser] = useState(false);

  const checkAsyncStorage = async () => {
    const token = await getToken();
    if (token) {
      const user = await getUser();
      if (user) {
        setUser(user);
        console.log(user);
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
        <AppStack />
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

export default AuthNavigator;
