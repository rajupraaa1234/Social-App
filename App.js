import React from "react";
import Provider from "./Utility/Navigation";
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

const App = () =>{
  return <Provider />
}

export default App;