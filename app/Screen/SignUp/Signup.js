//import liraries
import React, { Component,useState,useContext } from 'react';
import { View, Text, StyleSheet,ScrollView, Image,TouchableOpacity,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormButton from '../../../Components/FormButton';
import FormInput from '../../../Components/FormInput';
import { AuthContext } from '../../../Utility/Navigation/AuthProvider';
import Util from '../../../Utility/Util';
import SocialButton from '../../../Components/SocialButton';


// create a component
const Signup = ({navigation}) => {
    const[email,setEmail]  = useState();
    const[password,setPassword] = useState();
    const[cpassword,setCpassword] = useState();

    const{register} = useContext(AuthContext);

    const onCancel = () =>{
      ToastAndroid.show("User aleady exist",ToastAndroid.SHORT);
    }

    const onSuccess =()=>{
      ToastAndroid.show("User not Valid",ToastAndroid.SHORT);
    }

    const SignUpPress = () =>{
        if(email==null){
            ToastAndroid.show("Please enter your email",ToastAndroid.SHORT);
        }else if(!Util.isValidMail(email.trim())){
            ToastAndroid.show("Please enter valid email id",ToastAndroid.SHORT);
        }else if(password==null){
            ToastAndroid.show("Please enter password",ToastAndroid.SHORT); 
        }else if(password.trim().length<6){
            ToastAndroid.show("Password length must be larger than 6",ToastAndroid.SHORT);
        }else if(cpassword==null){
            ToastAndroid.show("Please enter confirm password",ToastAndroid.SHORT); 
        }else if(cpassword.trim()!= password.trim()){
            ToastAndroid.show("Password not same please try again",ToastAndroid.SHORT); 
        }
        else{
          register(email,password,onCancel,onSuccess);
        }
    }

    const fbLogin = () =>{

    }
    const googleLogin = () =>{
        
    }
    return (
        <View style={styles.container}>
             <Text style={styles.text}>Create an account</Text>
             <FormInput
                  labelValue={email}
                  onChangeText={(text)=>{setEmail(text)}}
                  placeholderText="Email"
                  iconType="user-circle"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false} 
             />
              <FormInput
                  labelValue={password}
                  onChangeText={(text)=>{setPassword(text)}}
                  placeholderText="Password"
                  iconType="lock"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  autoCorrect={false} 
             />
               <FormInput
                  labelValue={cpassword}
                  onChangeText={(text)=>{setCpassword(text)}}
                  placeholderText="Confirm Password"
                  iconType="lock"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  autoCorrect={false} 
             />
            <FormButton 
                  buttonTitle="Sign Up"
                  onPress={SignUpPress}  
            /> 
           
           <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                    Terms of service
                </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                    Privacy Policy
                </Text>
            </View>
        <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={fbLogin}
          />

          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={googleLogin}
          />


      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
    textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 35,
      justifyContent: 'center',
    },
    color_textPrivate: {
      fontSize: 13,
      fontWeight: '400',
      fontFamily: 'Lato-Regular',
      color: 'grey',
    },
  });
  export default Signup;
