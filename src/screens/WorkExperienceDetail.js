import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LoadingScreen from './LoadingScreen'



function WorkExperienceDetail({ route, navigation }) {
    const [details, setDetails] = useState('')
    const [loader, setLoader] = useState(true)
    const [key, setKey] = useState('')
    const [modalState, setModalState] = useState(false)



    useEffect(() => {
        getDetails();
    }, [])
    function renderModal(uuid) {
        return (
            <Modal visible={modalState} animationType='slide' transparent={true}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ backgroundColor: "white", width: "94%", borderRadius: 5 }}>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, marginBottom: 8 }}>Are you sure you want to delete this experience detail ?</Text>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 23, marginBottom: 10 }}>
                            <View style={{ width: '50%' }}></View>
                            <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => deleteDetail()} style={{ padding: 5 }}>
                                    <Text style={{ color: "#0ABDE3", fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4 }}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalState(false)} style={{ padding: 5 }}>
                                    <Text style={{ color: "#0ABDE3", fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4 }}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    async function getDetails() {
        try {
            var data = await AsyncStorage.getItem(route.params.data)
            setDetails(JSON.parse(data))
            setKey(route.params.data)
            setLoader(false)
        }
        catch (error) {
            console.log(error);
        }
    }

    async function deleteDetail() {
        try {
            await AsyncStorage.removeItem(key)
            navigation.replace('DrawerNavigation')
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={styles.outerMostView}>
            <View style={styles.titleBar}>
                <Icon name="arrow-back" size={30} style={styles.menuButton} onPress={() => { navigation.goBack(); }} />
                <Text style={styles.headingText}>Experience Details</Text>
            </View>


            {loader ? (
                <LoadingScreen />
            ) : (

                <ScrollView style={{ marginTop: 22, marginBottom: 22, }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={{ uri: details.image }} style={{ width: '100%', borderRadius: 7, height: 200 }} />
                        </View>
                        <View style={{ width: '94%', backgroundColor: 'white', marginTop: 20, borderRadius: 7 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8 }}>{details.companyName}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Role</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.role}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Skills Used</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.skillsUsed}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Joining Date</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.startingDate}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>Leaving Date</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.leavingDate}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginTop: 8, width: '33%' }}>CTC</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginTop: 8 }}>:</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, letterSpacing: 0.4, marginLeft: '2%', marginRight: '2%', marginTop: 8, width: '60%' }}>{details.ctc}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            )}

            {loader ? (
                <View></View>
            ) : (
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginBottom: 7 }}>
                    <View style={{ width: '47%' }}>
                        <TouchableOpacity style={styles.editButton} onPress={() => { navigation.navigate('EditExperience', { data: key }) }} >
                            <AntDesign name="edit" size={40} color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '47%' }}>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalState(true)}>
                            <AntDesign name="delete" size={40} color='white' />
                        </TouchableOpacity>
                    </View>
                    {renderModal(key)}
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



export default WorkExperienceDetail