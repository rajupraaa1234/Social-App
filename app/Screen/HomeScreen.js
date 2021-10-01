//import liraries
import React, { Component,useContext } from 'react';
import { View, Text, StyleSheet,Button, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PostItem from '../../Components/PostItem';
import { Container
} from '../../styles/HomeStyle';

const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../../assets/user1.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../../assets/post.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../../assets/user1.jpg'),
      postTime: '2 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../../assets/user1.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../../assets/post.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../../assets/user1.jpg'),
      postTime: '1 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../../assets/post.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../../assets/user1.jpg'),
      postTime: '2 days ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];
  
const HomeScreen = () => {
    return (
           <Container>
               <FlatList
                  data={Posts}
                  renderItem = {({item})=> <PostItem item ={item}/>}
                  keyExtractor={item=>item.id} 
                  showsVerticalScrollIndicator={false}
               />
           </Container>   
    );
};


//make this component available to the app
export default HomeScreen;
