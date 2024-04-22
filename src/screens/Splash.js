import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'


const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            isDetailsSet()
        }, 4000);
    }, []);



    async function isDetailsSet() {
        var value = await AsyncStorage.getItem('isUserDetailsSet')
        const flag = JSON.parse(value)
        if (flag) {
            navigation.replace('DrawerNavigation');
        } else {
            navigation.replace('SetUserDetails');
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#DAE0E2' }}>
            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Roboto-Medium', letterSpacing: 0.8, fontSize: 18 }}>MY RESUME</Text>
            </View>
            <View style={{ flex: 1 }}>
                <LottieView style={{ flex: 1 }} source={require('../../assets/lottie/Animation - 1712512472835.json')} autoPlay loop />
            </View>
            <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Roboto-Medium', letterSpacing: 0.8 }}>DEVELOPER - ADITYA</Text>
            </View>
        </View>
    )
}

export default Splash