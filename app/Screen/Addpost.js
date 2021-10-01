//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputField, InputWrapper } from '../../styles/AddPostStyle';
import ActionButton from 'react-native-action-button';
import { FloatingAction } from "react-native-floating-action";
import { Icon } from 'react-native-vector-icons/Ionicons';



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
    return (
        <View style={styles.container}>
            <InputWrapper>
                    <InputField
                        placeholder="What's on your mind"
                        multiline
                        numberOfLines={4}
                        >
                    </InputField>
                    <FloatingAction
                        actions={actions}
                        onPressItem={name => {
                        console.log(`selected button: ${name}`);
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
