import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import HomeScreen from '../../app/Screen/HomeScreen';


const Stack = createNativeStackNavigator();


const AppStack = () =>{
     return (
         <Stack.Navigator>
             <Stack.Screen name="Home" component={HomeScreen} />
         </Stack.Navigator>
     )
}

export default AppStack;