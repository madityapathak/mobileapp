import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import ImageCropPicker, { openCamera, openCropper } from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import * as Yup from 'yup'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import Toast from 'react-native-toast-message'





const dateFormat = /^\d{2}\-\d{2}\-\d{4}$/;


const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .matches(/^[a-zA-z .]+$/, 'Invalid Characters used')
        .max(35, 'Max 35 characters')
        .required('User Name is required'),
    userEmail: Yup.string()
        .matches(/^[a-zA-z0-9 @.]+$/, 'Invalid Characters used')
        .max(35, 'Maximum 35 characters')
        .required('Email is required'),
    userAddress: Yup.string()
        .matches(/^[a-zA-z0-9 -.,]+$/, 'Invalid Characters used')
        .max(200, 'Maximum 200 characters')
        .required('Address are required'),

    birthDate: Yup.string()
        .matches(dateFormat, 'DD-MM-YYYY')
        .required('Date of Birth is required'),
    phoneNumber: Yup.string()
        .max(12, 'Maximum 12 characters')
        .min(10, 'Minimum 10 characters')
        .required('Phone No. is required'),
    projects: Yup.string()
        .matches(/^[a-zA-z0-9 -.,]+$/, 'Invalid Characters used')
        .max(200, 'Maximum 200 characters')
        .required('Projects are required'),
    pL: Yup.string()
        .matches(/^[a-zA-z0-9 -.,]+$/, 'Invalid Characters used')
        .max(200, 'Maximum 200 characters')
        .required('Programing languages are required'),
    frameWorks: Yup.string()
        .matches(/^[a-zA-z0-9 -.,]+$/, 'Invalid Characters used')
        .max(200, 'Maximum 200 characters')
        .required('Frameworks are required')
})

function SetUserDetails({ navigation }) {

    const [image, setimage] = useState(null)



    function selecctImage() {
        ImageCropPicker.openPicker({ includeBase64: true, width: 800, height: 800, cropping: true }).then((croppedImage) => {
            setimage(croppedImage.path)
        }).catch((err) => { console.log(err) })
    }

    function showToast() {
        Toast.show({
            type: 'error',
            text1: 'Invalid Image',
            text2: 'Please select an image.',
            onPress: () => selecctImage()
        })
    }


    async function addUserDetails(userName, userEmail, userAddress, birthDate, phoneNumber, projects, pL, frameWorks) {
        let data = { image, userName, userEmail, userAddress, birthDate, phoneNumber, projects, pL, frameWorks }
        if (image) {
            await AsyncStorage.setItem("userdetails" + uuid.v4(), JSON.stringify(data))
            await AsyncStorage.setItem('isUserDetailsSet', JSON.stringify(true))
            navigation.replace('DrawerNavigation');
        } else {
            showToast()
        }
    }



    return (

        <SafeAreaView style={styles.outerMostView}>

            <View style={styles.titleBar}>
                {/* <Icon name="menuunfold" size={30} style={styles.menuButton} /> */}
                <Text style={styles.headingText}>User Details</Text>
            </View>

            <Formik
                initialValues={{ userName: '', userEmail: '', userAddress: '', birthDate: '', phoneNumber: '', projects: '', pL: '', frameWorks: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => (
                    addUserDetails(userName = values.userName, userEmail = values.userEmail, userAddress = values.userAddress, birthDate = values.birthDate, phoneNumber = values.phoneNumber, projects = values.projects, pL = values.pL, frameWorks = values.frameWorks)
                )}
            >
                {({
                    values,
                    errors,
                    touched,
                    isValid,
                    handleChange,
                    handleSubmit,
                    handleReset,
                }) => (

                    <View style={{ flex: 1, marginTop: 22 }}>
                        <ScrollView style={{ marginBottom: 44 }}>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={selecctImage} style={{ width: 280, height: 280, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A4B0BD' }}>
                                    {image ? (
                                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                                    ) : (
                                        <Entypo name="user" size={80} color='#616C6F' />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <Toast />

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('userName')}
                                    placeholder="Your Name"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.userName && errors.userName && (
                                    <Text style={styles.errorTexts}>
                                        {errors.userName}
                                    </Text>
                                )}
                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('userEmail')}
                                    placeholder="Email"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.userEmail && errors.userEmail && (
                                    <Text style={styles.errorTexts}>
                                        {errors.userEmail}
                                    </Text>
                                )}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('userAddress')}
                                    placeholder="Address"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.userAddress && errors.userAddress && (
                                    <Text style={styles.errorTexts}>
                                        {errors.userAddress}
                                    </Text>
                                )}
                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('birthDate')}
                                    placeholder="Date of Birth"
                                    style={styles.textInputs}
                                    keyboardType='numeric'
                                ></TextInput>
                                {touched.birthDate && errors.birthDate && (
                                    <Text style={styles.errorTexts}>
                                        {errors.birthDate}
                                    </Text>
                                )}
                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('phoneNumber')}
                                    placeholder="Phone Number"
                                    style={styles.textInputs}
                                    keyboardType='numeric'
                                ></TextInput>
                                {touched.phoneNumber && errors.phoneNumber && (
                                    <Text style={styles.errorTexts}>
                                        {errors.phoneNumber}
                                    </Text>
                                )}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('projects')}
                                    placeholder="Projects"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.projects && errors.projects && (
                                    <Text style={styles.errorTexts}>
                                        {errors.projects}
                                    </Text>
                                )}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('pL')}
                                    placeholder="Programing Languages"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.pL && errors.pL && (
                                    <Text style={styles.errorTexts}>
                                        {errors.pL}
                                    </Text>
                                )}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('frameWorks')}
                                    placeholder="Frameworks"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.frameWorks && errors.frameWorks && (
                                    <Text style={styles.errorTexts}>
                                        {errors.frameWorks}
                                    </Text>
                                )}
                            </View>
                        </ScrollView>
                        <View style={styles.lowerView}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                                <MaterialIcons name="post-add" size={40} color='white' />
                                <Text style={styles.buttonTitle}>Save Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
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
    saveButton: {
        width: '94%',
        backgroundColor: '#45CE30',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 3,
        paddingTop: 3,
        position: 'absolute',
        bottom: 0,
    },
    buttonTitle: {
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        marginLeft: 5,
    },
    lowerView: {
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textInputs: {
        width: '94%',
        backgroundColor: '#EAF0F1',
        marginTop: 8,
        fontSize: 17,
        borderRadius: 5,
        letterSpacing: 0.3,
        fontFamily: 'Roboto-Light'
    },
    dateInputs: {
        width: '100%',
        backgroundColor: '#EAF0F1',
        marginTop: 8,
        fontSize: 17,
        borderRadius: 5,
        letterSpacing: 0.3,
        fontFamily: 'Roboto-Light'
    },
    errorTexts: {
        color: 'red',
        letterSpacing: 0.3,
        fontFamily: 'Roboto-Light',
    }
})


export default SetUserDetails