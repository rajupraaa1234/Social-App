//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions ,ScrollView} from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// create a component
const Chat = () => {
    return (
        <View style={styles.container}>
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
        </View>
      );
    
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        
    },
});

//make this component available to the app
export default Chat;
