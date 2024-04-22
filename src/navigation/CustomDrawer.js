import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'


function CustomDrawer(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{}}>
                <ImageBackground source={require('../../assets/images/background.jpeg')} style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/images/developer.jpg')} style={{ height: 200, width: 200, borderRadius: 100 }} />
                </ImageBackground>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ borderTopWidth: 1, borderTopColor: 'black' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                        {/* <Ionicons name='share-social-outline' size={22} /> */}
                        <Text style={{fontSize:15,marginLeft:5,fontFamily:'Roboto-Medium'}}>DEVELOPER - ADITYA</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CustomDrawer