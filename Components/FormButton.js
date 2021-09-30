//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { windowHeight,windowWidth } from '../Utility/Dimension'; 

// create a component
const FormButton = ({buttonTitle,...rest}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>
                {buttonTitle}
            </Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop:10,
        width:'100%',
        height:windowHeight/15,
        backgroundColor:'#2e64e5',
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,
    },
    buttonText :{
        fontSize:16,
        fontWeight:'bold',
        color:'#ffffff',
        fontFamily:'Lato-Regular',
    }
});

//make this component available to the app
export default FormButton;
