import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import HomeScreen from '../../app/Screen/HomeScreen';
import Chat from '../../app/Screen/Chat';
import {TouchableOpacity, View} from 'react-native';
import { Text } from 'react-native';
import Profile from '../../app/Screen/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Addpost from '../../app/Screen/Addpost';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const FeedStack = ({navigation}) =>{
    return (
        <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}
                   options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      color: '#2e64e5',
                      fontFamily: 'Kufam-SemiBoldItalic',
                      fontSize: 18,
                    },
                    headerStyle: {
                      shadowColor: '#fff',
                      elevation: 0,
                    },
                    headerRight: () => (
                      <View style={{marginRight: 10}}>
                        <FontAwesome5.Button
                          name="plus"
                          size={22}
                          backgroundColor="#fff"
                          color="#2e64e5"
                          onPress={()=>navigation.navigate('Addpost')}
                        />
                      </View>
                    ),
                  }}
                
                />
            <Stack.Screen name="Addpost" component={Addpost}
                  options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      shadowColor: '#2e64e515',
                      elevation: 0,
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                      <View style={{marginLeft: 15}}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    // headerRight: () => (
                    //     <TouchableOpacity style={{marginRight: 10}}>
                    //         <Text style={{fontSize:16,color:"#2e64e5"}}>Post</Text>
                    //     </TouchableOpacity>
                    //   ),
                  }}
             />
        </Stack.Navigator>
   );
    
}

const ChatStack = ({navigation}) =>{
    return (
          <Stack.Navigator>
               <Stack.Screen name="Chat" component={Chat}
                  options = {{
                      headerShown:false,
                  }}
                 />
          </Stack.Navigator>
    )
}
const ProfileStack = ({navigation}) =>{
    return (
        <Stack.Navigator>
             <Stack.Screen name="Profile" component={Profile}
                options = {{
                    headerShown:false,
                }}
               />
        </Stack.Navigator>
  )
    
}


const AppStack = () =>{
     return (
        <Tab.Navigator 
            screenOptions={{
                 activeTintColor: '#2e64e5',
                 headerShown:false,
            }}>
            <Tab.Screen name="FeedStack" component={FeedStack} 
                options={({route}) => ({
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons
                        name="home-outline"
                        color={color}
                        size={size}
                    />
                    ),
                })}
            />
            <Tab.Screen name="ChatStack" component={ChatStack} 
                options={({route}) => ({
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({color, size}) => (
                      <Ionicons
                        name="chatbox-ellipses-outline"
                        color={color}
                        size={size}
                      />
                    ),
                  })}
            />
            <Tab.Screen name="ProfileStack" component={ProfileStack} 
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color, size}) => (
                      <Ionicons name="person-outline" color={color} size={size} />
                    ),
                  }}
            />
        </Tab.Navigator>
     )
}

export default AppStack;