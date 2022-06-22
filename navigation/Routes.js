import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {Darkmode,Lightmode} from '../src/components/ModeColor/Modes';

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const scheme = useColorScheme();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          status: "online"
        })
    } else {
      return null
    }

  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={scheme =='dark' ?Darkmode : Lightmode}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
