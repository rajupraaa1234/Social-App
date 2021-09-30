
import { NavigationContainer } from "@react-navigation/native";
import Authstack from "./Authstack";
import React, { useState, useEffect,useContext } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import AppStack from "./AppStack";
import { AuthContext } from "./AuthProvider";

const Routes = () =>{
   const{user,setUser} = useContext(AuthContext);
   const [initializing, setInitializing] = useState(true);

   const onAuthStateChanged = (user) =>{
       setUser(user);
       if(initializing) setInitializing(false);
   }
   useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;
    return (
        <NavigationContainer>
            {user ? <AppStack /> :  <Authstack />}
        </NavigationContainer>
    )
}

export default Routes;