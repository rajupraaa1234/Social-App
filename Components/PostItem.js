//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Container, Divider, Interaction, InteractionText, InteractionWrapper, PostImg,
     PostText,
      PostTime,
       UserImg, 
       UserInfo, 
       UserInfoText, 
       UserName 
} from '../styles/HomeStyle';
import ProgressiveImage from '../Utility/ProgressiveImage'
import moment from 'moment';
import { AuthContext } from '../Utility/Navigation/AuthProvider.android';

// create a component
const PostItem = ({item,onDelete,onPress}) => {
    const{user} = useContext(AuthContext);
    // likeIcon = item.liked ? 'heart' : 'heart-outline';
    // likeIconColor = item.liked ? '#2e64e5' : '#333';

    likeIcon = 'heart';
    likeIconColor = '#2e64e5';

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
            <UserImg source = {{uri : item.userImg}}/>
            <UserInfoText>
                <TouchableOpacity onPress={onPress}>
                    <UserName>{item.userName}</UserName>
                </TouchableOpacity>
                 <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
            </UserInfoText>
        </UserInfo>
        <PostText>{item.post}</PostText>
        {item.postImg != null ? (
            <ProgressiveImage
                defaultImageSource = {require('../assets/default-img.jpg')}
                source={{uri: item.postImg}}
                style={{width: '100%', height: 250}}
                resizeMode="cover"
            /> 
          )  
          : 
          <Divider />}
        <InteractionWrapper>
            <Interaction active={item.liked}>
                <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                <InteractionText active={item.liked}>{likeText}</InteractionText>
            </Interaction>
            <Interaction>
                <Ionicons name="md-chatbubble-outline" size={25} />
                <InteractionText>{commentText}</InteractionText>
            </Interaction>
            {user.uid === item.userId ? (
                <Interaction onPress={()=>{onDelete(item.id)}}>
                   <Ionicons name="md-trash-bin" size={25} />
                </Interaction>
            ) : null}
        </InteractionWrapper>
    </Card>
    );
};



//make this component available to the app
export default PostItem;
