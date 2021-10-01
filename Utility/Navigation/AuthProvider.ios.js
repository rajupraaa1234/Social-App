//import liraries
import React, { Component, createContext,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'

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
