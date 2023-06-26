import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uni } from '../../css/uni';

const PranahUser = async () => {
    try {
      const value = await AsyncStorage.getItem('mail');
      const passval = await AsyncStorage.getItem('pass');
      const usernameval = await AsyncStorage.getItem('username');
      const userlanguage = await AsyncStorage.getItem('lang');
      return {
            mail: value,
            pass: passval,
            username: usernameval,
            lang: userlanguage == undefined ? "hi" : userlanguage
      };
    } catch (error) {
      uni.Error();
    }
  };
  export default PranahUser;