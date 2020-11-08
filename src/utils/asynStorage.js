import AsyncStorage from '@react-native-community/async-storage';

export const storeToken = async value => {
  try {
    await AsyncStorage.setItem('auth-token', value);
  } catch (error) {
    return;
  }
};

export const storeUser = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    return;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('auth-token');
    if (token) {
      return token;
    }
  } catch (error) {
    // error reading value
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('auth-token');
  } catch (e) {
    // remove error
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    // remove error
  }
};

export const storeLaunched = async () => {
  try {
    await AsyncStorage.setItem('alreadyLaunched', 'true');
  } catch (error) {
    return;
  }
};

export const getLaunched = async () => {
  try {
    const token = await AsyncStorage.getItem('alreadyLaunched');
    console.log(token);
    if (token) {
      return token;
    }
  } catch (error) {
    // error reading value
  }
};
