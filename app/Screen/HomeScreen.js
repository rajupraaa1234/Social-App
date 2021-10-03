//import liraries
import React, { Component,useContext,useEffect, useState } from 'react';
import { View, Text, StyleSheet,Button, FlatList,Alert,RefreshControl,ScrollView ,Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import PostItem from '../../Components/PostItem';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
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
      post:'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];
  
const HomeScreen = ({navigation}) => {

    const[posts,setPosts] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const[loading,setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const fetchList = async () =>{
          setLoading(true);
                try{
                      const list = [];
                      await firestore()
                        .collection('posts')
                        .orderBy('postTime','desc')
                        .get()
                        .then((querySnapshot)=>{
                          querySnapshot.forEach((doc)=>{
                              const {
                                userId,
                                postImg,
                                post,
                                postTime,
                                likes,
                                comments,
                                } = doc.data();
                                list.push({
                                    id:doc.id,
                                    userId,
                                    userName:'Test Name',
                                    userImg:'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                                    postTime,
                                    post,
                                    liked: false,
                                    postImg,
                                    likes,
                                    comments,
                                });
                          });
                        });
                        console.log(list);
                    setPosts(list);
                    setLoading(false);
                }catch(e){
                   console.log(e);
                   setLoading(false);
                };    
    };

    useEffect(()=>{
       fetchList();
    },[]);

    useEffect(() => {
      fetchList();
      setDeleted(false);
    }, [deleted]);

    const onRefresh = React.useCallback(async () => {
       setRefreshing(true);
       fetchList();
       setRefreshing(false);
    }, [refreshing]);

    const handleDelete = (postId) => {
      Alert.alert(
        'Delete post',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed!'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => ondeletePost(postId),
          },
        ],
        {cancelable: false},
      );
    };

    const ondeletePost = (postId) => {
      console.log('Current Post Id: ', postId);
  
      firestore()
        .collection('posts')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const {postImg} = documentSnapshot.data();
  
            if (postImg != null) {
              const storageRef = storage().refFromURL(postImg);
              const imageRef = storage().ref(storageRef.fullPath);
  
              imageRef
                .delete()
                .then(() => {
                  console.log(`${postImg} has been deleted successfully.`);
                  deleteFirestoreData(postId);
                })
                .catch((e) => {
                  console.log('Error while deleting the image. ', e);
                });
              // If the post image is not available
            } else {
              deleteFirestoreData(postId);
            }
          }
        });
    };
  
    const deleteFirestoreData = (postId) => {
      firestore()
        .collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
          Alert.alert(
            'Post deleted!',
            'Your post has been deleted successfully!',
          );
          setDeleted(true);
        })
        .catch((e) => console.log('Error deleting posst.', e));
    };
    return (
           <Container>
               {loading ? (
                   <ScrollView showsVerticalScrollIndicator={false}>
                   <SkeletonPlaceholder >
                       <View style={{ flexDirection: "row", alignItems: "center" }}>
                           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                           <View style={{ marginLeft: 20 }}>
                           <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                           <View
                               style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                           />
                           </View>
                       </View>
                       <View style={{marginTop:8}}>
                           <View style={{ width: 160, height: 20, marginTop:10, borderRadius: 4 }} />
                       </View>
                       <View style={{marginTop:10,marginBottom:10}}>
                           <View style={{ width: Dimensions.get('window').width, height: 220, marginTop:10, borderRadius: 4 }} />
                       </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row", alignItems: "center" }}>
                           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                           <View style={{ marginLeft: 20 }}>
                           <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                           <View
                               style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                           />
                           </View>
                       </View>
                       <View style={{marginTop:8}}>
                           <View style={{ width: 160, height: 20, marginTop:10, borderRadius: 4 }} />
                       </View>
                       <View style={{marginTop:10,marginBottom:8}}>
                           <View style={{ width: Dimensions.get('window').width, height: 220, marginTop:10, borderRadius: 4 }} />
                       </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row", alignItems: "center" }}>
                           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                           <View style={{ marginLeft: 20 }}>
                           <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                           <View
                               style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                           />
                           </View>
                       </View>
                       <View style={{marginTop:8}}>
                           <View style={{ width: 160, height: 20, marginTop:10, borderRadius: 4 }} />
                       </View>
                       <View style={{marginTop:10}}>
                           <View style={{ width: Dimensions.get('window').width, height: 220, marginTop:10, borderRadius: 4 }} />
                       </View>
                    </SkeletonPlaceholder>
                 </ScrollView>
               ) : (
                <FlatList
                    data={posts}
                    renderItem = {({item})=> <PostItem item ={item} onDelete={handleDelete} onPress={()=>navigation.navigate('HomeProfile',{userId : item.userId})}/>}
                    keyExtractor={item=>item.id} 
                    refreshControl
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                 />
              )} 
           </Container>   
    );
};


//make this component available to the app
export default HomeScreen;
