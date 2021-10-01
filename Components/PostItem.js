//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Card, Container, Divider, Interaction, InteractionText, InteractionWrapper, PostImg,
     PostText,
      PostTime,
       UserImg, 
       UserInfo, 
       UserInfoText, 
       UserName 
} from '../styles/HomeStyle';

// create a component
const PostItem = ({item}) => {
    likeIcon = item.liked ? 'heart' : 'heart-outline';
    return (
        <Card>
        <UserInfo>
            <UserImg source = {item.userImg}/>
            <UserInfoText>
                 <UserName>{item.userName}</UserName>
                 <PostTime>{item.postTime}</PostTime>
            </UserInfoText>
        </UserInfo>
        <PostText>{item.post}</PostText>
        {item.postImg != 'none' ? <PostImg source={item.postImg} />  : <Divider />}
        {/* <PostImg source = {require('../../assets/post.jpg')} /> */}
        {/* <Divider /> */}
        <InteractionWrapper>
            <Interaction>
                <Ionicons name={likeIcon} size={25} />
                <InteractionText>Like</InteractionText>
            </Interaction>
            <Interaction>
                <Ionicons name="md-chatbubble-outline" size={25} />
                <InteractionText>Comment</InteractionText>
            </Interaction>
        </InteractionWrapper>
    </Card>
    );
};



//make this component available to the app
export default PostItem;
