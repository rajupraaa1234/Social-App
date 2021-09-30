//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import colors from '../../../Utility/constant/colors';



// create a component
const OnBoarding = ({navigation}) => {

 
    return (
        <Onboarding
        onDone={()=>{navigation.navigate('Login')}}
        onSkip={()=>{navigation.replace('Login')}}
        pages={[
          {
            backgroundColor: colors.ONBOARD1,
            image: <Image source={require('../../../assets/onboarding-img1.png')} />,
            title: 'Connect to the World',
            subtitle: 'A new Way To Connect With The World',
          },
          {
            backgroundColor: colors.ONBOARD2,
            image: <Image source={require('../../../assets/onboarding-img2.png')} />,
            title: 'Share Your Favorites',
            subtitle: 'Share Your Thoughts With Similar Kind of People',
          },
          {
            backgroundColor: colors.ONBOARD3,
            image: <Image source={require('../../../assets/onboarding-img3.png')} />,
            title: 'Become The Star',
            subtitle: 'Let The Spot Light Capture You',
          },
          
        ]}
      />
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default OnBoarding;
