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
    likeIconColor = item.liked ? '#2e64e5' : '#333';

    if(item.likes==1){
        likeText = '1 Like';
    }else if(item.likes>1){
        likeText = item.likes + ' Likes';
    }else{
        likeText = 'Like'
    }

    if(item.comments==1){
        commentText = '1 Comment';
    }else if(item.likes>1){
        commentText = item.comments + ' Comments';
    }else{
        commentText = 'Comment'
    }

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
            <Interaction active={item.liked}>
                <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                <InteractionText active={item.liked}>{likeText}</InteractionText>
            </Interaction>
            <Interaction>
                <Ionicons name="md-chatbubble-outline" size={25} />
                <InteractionText>{commentText}</InteractionText>
            </Interaction>
        </InteractionWrapper>
    </Card>
    );
};



//make this component available to the app
export default PostItem;
