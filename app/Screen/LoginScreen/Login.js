//import liraries
import React, { Component,useState,useContext } from 'react';
import { View, Text, StyleSheet,ScrollView, Image,TouchableOpacity,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormButton from '../../../Components/FormButton';
import FormInput from '../../../Components/FormInput';
import SocialButton from '../../../Components/SocialButton';
import { AuthContext } from '../../../Utility/Navigation/AuthProvider';
import Util from '../../../Utility/Util';


// create a component
const Login = ({navigation}) => {
    const[email,setEmail]  = useState();
    const{login} = useContext(AuthContext);
    const[password,setPassword] = useState();
    const[msg,setMsg] = useState();
    
    const onCancel = () =>{
      ToastAndroid.show("User not Valid",ToastAndroid.SHORT);
    }

    const onSuccess =()=>{
        console.log("onSuccess");
    }
  
  
    const SignInPress = () =>{
      if(email==null){
          ToastAndroid.show("Please enter your email",ToastAndroid.SHORT);
      }else if(!Util.isValidMail(email.trim())){
          ToastAndroid.show("Please enter valid email id",ToastAndroid.SHORT);
      }else if(password==null){
          ToastAndroid.show("Please enter password",ToastAndroid.SHORT); 
      }else if(password.trim().length<6){
          ToastAndroid.show("Password length must be larger than 6",ToastAndroid.SHORT);
      }else{
         login(email,password,onCancel,onSuccess);
         console.log(msg);
        // ToastAndroid.show(res,ToastAndroid.SHORT);
      }
    };

    const fbLogin = () =>{

    }
    const googleLogin = () =>{
        
    }
    return (
        <View style={styles.container}>
             <Image source = {require('../../../assets/connect.png')} style={styles.logo} />
             <Text style={styles.text}>Social App</Text>
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
            <FormButton 
                  buttonTitle="Sign In"
                  onPress={SignInPress}  
            /> 

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
           <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={fbLogin}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={googleLogin}
          />


        <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.navButtonText}>
            Don't have an acount? Create here
            </Text>
      </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex:1,
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
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
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
  });
export default Login;
