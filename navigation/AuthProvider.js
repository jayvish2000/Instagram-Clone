import React, {createContext, useState} from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ToastAndroid} from 'react-native'



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);

  return (
    
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        googleLogin: async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const  idToken= await GoogleSignin.signIn();
           
            const googlecredential = auth.GoogleAuthProvider.credential(idToken);
            const userdata= await auth().signInWithCredential(googlecredential) 
            console.log('users',userdata)
          } catch (e) {
            console.log(e);
          }
        },
        forgotpassword: async(email)=>{
             try{
            firebase.auth().sendPasswordResetEmail(email).then(()=>{                
              ToastAndroid.show(`Please check your email :${email}`, ToastAndroid.LONG,)              
            })
             }catch(e){
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
    </AuthContext.Provider>
  );
};
