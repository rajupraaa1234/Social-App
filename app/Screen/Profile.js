//import liraries
import React, { Component,useContext } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import { AuthContext } from '../../Utility/Navigation/AuthProvider';

// create a component
const Profile = () => {
    const{logout} = useContext(AuthContext);

    const onLogout = () =>{
        logout();
    }
    return (
        <View style={styles.container}>
            <Button title="Logout" onPress={onLogout}/>
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
});

//make this component available to the app
export default Profile;
