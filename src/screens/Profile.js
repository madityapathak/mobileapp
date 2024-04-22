import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingScreen from './LoadingScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'



function Profile({ navigation }) {
    const [details, setDetails] = useState('')
    const [loader, setLoader] = useState(true)
    const [key, setKey] = useState('')


    useEffect(() => {
        getDetails();
    }, [])

    async function getDetails() {
        try {
            var allKeysArr = await AsyncStorage.getAllKeys();
            const profileInfoKey = allKeysArr.filter(entry => entry.startsWith("userdetails"));
            var data = await AsyncStorage.getItem(profileInfoKey[0])
            setDetails(JSON.parse(data))
            setKey(profileInfoKey[0])
            setLoader(false)
        }
        catch (error) {
            console.log(error);
        }
    }




    return (
        <SafeAreaView style={styles.outerMostView}>
            <View style={styles.titleBar}>
                <AntDesign name="menuunfold" size={30} style={styles.menuButton} onPress={() => { navigation.openDrawer(); }} />
                <Text style={styles.headingText}>User Profile</Text>
            </View>


            {loader ? (
                <LoadingScreen />
            ) : (

                <ScrollView style={{ marginTop: 22, marginBottom: 22 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={{ uri: details.image }} style={{ width: 320, borderRadius: 160, height: 320 }} />
                        </View>
                        <View style={{ width: '94%', backgroundColor: 'white', marginTop: 20, borderRadius: 7 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8 }}>{details.userEmail}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Name</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.userName}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Address</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.userAddress}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Ph No.</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.phoneNumber}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>DOB</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.birthDate}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Projects</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.projects}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Languages</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.pL}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Frameworks</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.frameWorks}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            )}

            {loader ? (
                <View></View>
            ) : (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 7 }}>
                    <TouchableOpacity style={styles.editButton} onPress={()=>{navigation.navigate('EditUserDetail',{data:key})}}>
                        <AntDesign name="edit" size={40} color='white' />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )


}



var styles = StyleSheet.create({
    outerMostView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#DAE0E2'

    },
    titleBar: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#0A3D62',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 58,
    },
    headingText: {
        fontSize: 18,
        fontFamily: 'Montserrat-VariableFont_wght',
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.8,
    },
    menuButton: {
        position: 'absolute',
        left: 15,
        color: 'white',
    },
    editButton: {
        width: '94%',
        backgroundColor: '#EEC213',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 6,
        paddingTop: 6,

    },
    deleteButton: {
        width: '94%',
        backgroundColor: '#FF3E4D',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 6,
        paddingTop: 6,

    },
})


export default Profile