//import liraries
import React, { Component, createContext,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';


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
                         await auth().createUserWithEmailAndPassword(email, password)
                         .then(() => {
                            onSuccess();
                            //Once the user creation has happened successfully, we can add the currentUser into firestore
                            //with the appropriate details.
                            firestore().collection('users').doc(auth().currentUser.uid)
                            .set({
                                fname: '',
                                lname: '',
                                email: email,
                                createdAt: firestore.Timestamp.fromDate(new Date()),
                                userImg: null,
                            })
                            //ensure we catch any errors at this stage to advise us if something does go wrong
                            .catch(error => {
                                console.log('Something went wrong with added user to firestore: ', error);
                            })
                            })
                            //we need to catch the whole sign up process if it fails too.
                            .catch(error => {
                                console.log('Something went wrong with sign up: ', error);
                            });
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
