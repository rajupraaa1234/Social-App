//import liraries
import React, { Component, createContext,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const AuthContext = createContext();

// create a component
const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null);
    return (
        <AuthContext.Provider
           value={{
               user,
               setUser,
               login : async (email,password,onCancel,onSuccess) => {
                   try{
                       await auth().signInWithEmailAndPassword(email,password);
                       onSuccess();
                   }catch(e){
                      //console.log(e.string);
                      onCancel();
                   }
               },
               register : async (email,password,onCancel,onSuccess)=>{
                   try{
                        await auth().createUserWithEmailAndPassword(email,password); 
                        onSuccess();
                   }
                   catch(e){
                       console.log(e);
                       onCancel();
                   }
               },
               googleLogin: async () => {
                const { idToken } = await GoogleSignin.signIn();
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                return auth().signInWithCredential(googleCredential);
              },
              FbLogin : async () =>{
                  try{
                    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
                    if (result.isCancelled) {
                      throw 'User cancelled the login process';
                    }
                    // Once signed in, get the users AccesToken
                    const data = await AccessToken.getCurrentAccessToken();
                  
                    if (!data) {
                      throw 'Something went wrong obtaining access token';
                    }
                    // Create a Firebase credential with the AccessToken
                    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                    // Sign-in the user with the credential
                      await auth().signInWithCredential(facebookCredential);
                  }catch(e){
                      console.log(e);
                  }
              },
              logout: async () =>{
                   try{
                       await auth().signOut();
                   }catch(e){
                       console.log(e);
                   }
               }
           }}
        >
            {children}
        </AuthContext.Provider>
    );
};

//make this component available to the app
export default AuthProvider;
