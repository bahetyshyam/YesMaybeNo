import React, {useState, useEffect, createContext} from 'react';
import AppDrawer from './AppDrawer';
import AuthStack from './AuthStack';
import IntroductoryStack from './IntroductoryStack';
import {
  getToken,
  getUser,
  storeLaunched,
  getLaunched,
} from '../utils/asynStorage';

export const UserContext = createContext({});

const AppNavigator = () => {
  const [user, setUser] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState(false);

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

  const checkFirstLaunch = async () => {
    const alreadyLaunched = await getLaunched();
    if (alreadyLaunched == null) {
      storeLaunched();
      setFirstLaunch(true);
    } else setFirstLaunch(false);

    console.log('FIrst ' + firstLaunch);
  };

  useEffect(() => {
    checkAsyncStorage();
    checkFirstLaunch();
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
    if (firstLaunch) return <IntroductoryStack />;
    else {
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
  }
};

export default AppNavigator;
