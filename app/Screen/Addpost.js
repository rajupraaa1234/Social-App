//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, Platform,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { InputField, InputWrapper, StatusWrapper, SubmitBtn } from '../../styles/AddPostStyle';
import ActionButton from 'react-native-action-button';
import { FloatingAction } from "react-native-floating-action";
import { Icon } from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';



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
    const[img,setImg] = useState(null);
    const[uploading,setUploading] = useState(false);
    const[transfer,setTranser] = useState(0);
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
    const OnSubmit = async ()=>{
        const uploadUri = img;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTranser(0);
        try{
            const task = storage().ref(filename).putFile(uploadUri); 
           task.on('state_changed', taskSnapshot => {
               setTranser(
                  Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100
               );
               setUploading(false);
           });
           
        }catch(e){
            setUploading(false);
            setTranser(0);
            console.log(e); 
        }
       setImg(null);
    }
    return (
        <View style={styles.container}>
            <InputWrapper>
            {img != null ? <Image source={{uri:img}} style={{width:w,height: 200, resizeMode:'cover'}}/> : null }
                    <InputField
                        placeholder="What's on your mind"
                        multiline
                        numberOfLines={4}
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
