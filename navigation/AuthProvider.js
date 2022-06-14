import React, { createContext, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ToastAndroid } from 'react-native'



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

          if (!strongRegex.test(email)) {
            ToastAndroid.show('Invailed email or password', ToastAndroid.SHORT)
          } else if (!password ) {
            ToastAndroid.show('Invailed  password', ToastAndroid.SHORT)
          }
          else {
            return false;
          }

          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        googleLogin: async () => {
          try {
            const { idToken } = await GoogleSignin.signIn()
            const googleCradential = auth.GoogleAuthProvider.credential(idToken)
            // console.log('google', googleCradential)
            await auth().signInWithCredential(googleCradential)
          } catch (e) {
            console.log(e)
          }

        },
        forgotpassword: async (email) => {
          try {
            firebase.auth().sendPasswordResetEmail(email).then(() => {
              ToastAndroid.show(`Please check your email :${email}`, ToastAndroid.LONG,)
            })
          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider >
  );
};
