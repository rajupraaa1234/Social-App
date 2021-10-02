//import liraries
import React, { Component, useState,useContext } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, Platform,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { InputField, InputWrapper, StatusWrapper, SubmitBtn } from '../../styles/AddPostStyle';
import ActionButton from 'react-native-action-button';
import { FloatingAction } from "react-native-floating-action";
import { Icon } from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../Utility/Navigation/AuthProvider.android';



const actions = [
    {
      text: "Take Photo",
      icon: require("../../assets/camera1.png"),
      name: "bt_cam",
      position: 1
    },
    {
      text: "Select Gallery",
      icon: require("../../assets/gallery.png"),
      name: "bt_gal",
      position: 2,
    }
  ];


// create a component
const Addpost = () => {
    const{user} = useContext(AuthContext)
    const[img,setImg] = useState(null);
    const[uploading,setUploading] = useState(false);
    const[transfer,setTranser] = useState(0);
    const[post,setPost] = useState(null);
    const w = Dimensions.get('window').width;
    const ImgeFromCamera = () =>{
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
          }).then(image => {
              const imgUri = Platform.OS ==='ios' ? image.sourceURL : image.path;
              setImg(imgUri);
            console.log(image);
          })
          .catch(error => {
            setImg(null);
             console.log(error)
           });
    }

    const ImageTakeFromGallery = () =>{
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true
          }).then(image => {
            const imgUri = Platform.OS ==='ios' ? image.sourceURL : image.path;
            setImg(imgUri);
            console.log(image);
          })
          .catch(error => {
            setImg(null);
            console.log(error);
        });
    }

    const OnSubmit = async () =>{
          const url = await UploadImg();
          setUploading(true);
          setTranser(100);
          firestore()
          .collection('posts')
          .add({
               userId : user.uid,
               post : post,
               postImg : url,
               postTime : firestore.Timestamp.fromDate(new Date()),
               likes : 0,
               comments : 0,
          })
          .then(()=>{
               console.log('Post Added');
               Alert.alert(
                   'Post Published',
                   'Your post has been published'
               );
               setPost(null);
               setUploading(false);
               setTranser(0);
          })
          .catch((error)=>{
             console.log('Something went wrong with added post to firestore.', error);
               setPost(null);
               setUploading(false);
               setTranser(0);
          });
         // console.log(url);
    }
    const UploadImg = async ()=>{
        if(img==null) return null;
        const uploadUri = img;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTranser(0);
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri); 
        task.on('state_changed', taskSnapshot => {
            setTranser(
               Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100
            );
        });
        try{
            await task;
            const url = await storageRef.getDownloadURL();
            setImg(null);
            setUploading(false);
            return url;
        }catch(e){
            setUploading(false);
            setTranser(0);
            return null; 
        }
    }
    return (
        <View style={styles.container}>
            <InputWrapper>
            {img != null ? <Image source={{uri:img}} style={{width:w,height: 200, resizeMode:'cover'}}/> : null }
                    <InputField
                        placeholder="What's on your mind"
                        multiline
                        numberOfLines={4}
                        value={post}
                        onChangeText={(content)=>setPost(content)}
                        >
                    </InputField>
                    {uploading ? (
                        <StatusWrapper>
                             <Text>{transfer} % Completed</Text>
                             <ActivityIndicator size='large' color="#0000ff"></ActivityIndicator>
                        </StatusWrapper>
                    ) : (
                        <SubmitBtn onPress={OnSubmit}>
                           <Text style={{fontSize:16,color:"#2e64e5"}}>Post</Text>
                        </SubmitBtn> 
                    )}
                    <FloatingAction
                        actions={actions}
                        onPressItem={name => {
                            if(name==='bt_cam'){
                                ImgeFromCamera();
                            }else if(name == 'bt_gal'){
                                ImageTakeFromGallery();  
                            }
                        }}
                    />
            </InputWrapper>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

//make this component available to the app
export default Addpost;
