import React, {useState, useEffect, createContext} from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export const AuthContext = createContext(null);

const AuthNavigator = () => {
  const [user, setUser] = useState(false);

  return user ? (
    <AuthContext.Provider value={user}>
      <AppStack />
    </AuthContext.Provider>
  ) : (
    <AuthStack />
  );
};

export default AuthNavigator;
