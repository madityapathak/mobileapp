import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import ImageCropPicker, { openCamera, openCropper } from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Yup from 'yup'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import Toast from 'react-native-toast-message'


const dateFormat = /^\d{2}\-\d{2}\-\d{4}$/;


const validationSchema = Yup.object().shape({
    companyName: Yup.string()
        .matches(/^[a-zA-z .]+$/, 'Invalid Characters used')
        .max(35, 'Max 35 characters')
        .required('Company Name is required'),
    role: Yup.string()
        .matches(/^[a-zA-z .]+$/, 'Invalid Characters used')
        .max(25, 'Maximum 25 characters')
        .required('Role is required'),
    skillsUsed: Yup.string()
        .matches(/^[a-zA-z ,.]+$/, 'Invalid Characters used')
        .max(150, 'Maximum 150 characters')
        .required('Skills are required'),
    startingDate: Yup.string()
        .matches(dateFormat, 'DD-MM-YYYY')
        .required('Starting Date is required'),
    leavingDate: Yup.string()
        .matches(dateFormat, 'DD-MM-YYYY')
        .required('Leaving Date is required'),
    ctc: Yup.number()
        .required('CTC is required'),
})



function AddExperience({ navigation }) {
    const [image, setimage] = useState(null)

    function selecctImage() {
        ImageCropPicker.openPicker({ includeBase64: true, width: 1356, height: 800, cropping: true }).then((croppedImage) => {
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


    async function addExperience(companyName, role, skillsUsed, startingDate, leavingDate, ctc) {
        let data = { image, companyName, role, skillsUsed, startingDate, leavingDate, ctc }
        if (image) {
            await AsyncStorage.setItem("workexp" + uuid.v4(), JSON.stringify(data))
            navigation.replace('DrawerNavigation');
        } else {
            showToast()
        }
    }




    return (


        <SafeAreaView style={styles.outerMostView}>
            <View style={styles.titleBar}>
                <Icon name="menuunfold" size={30} style={styles.menuButton} onPress={() => { navigation.openDrawer(); }} />
                <Text style={styles.headingText}>Add Experience</Text>
            </View>
            <Formik
                initialValues={{ companyName: '', role: '', skillsUsed: '', startingDate: '', leavingDate: '', ctc: '', }}
                validationSchema={validationSchema}
                onSubmit={(values) => (
                    addExperience(companyName=values.companyName, role=values.role, skillsUsed=values.skillsUsed, startingDate=values.startingDate, leavingDate=values.leavingDate, ctc=values.ctc)
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
                                <TouchableOpacity onPress={selecctImage} style={{ width: 339, height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A4B0BD' }}>
                                    {image ? (
                                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                                    ) : (
                                        <MaterialIcons name="add-home-work" size={80} color='#616C6F' />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <Toast />

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('companyName')}
                                    placeholder="Company Name"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.companyName && errors.companyName && (
                                    <Text style={styles.errorTexts}>
                                        {errors.companyName}
                                    </Text>
                                )}
                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('role')}
                                    placeholder="Role"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.role && errors.role && (
                                    <Text style={styles.errorTexts}>
                                        {errors.role}
                                    </Text>
                                )}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('skillsUsed')}
                                    placeholder="Skills Used"
                                    style={styles.textInputs}
                                ></TextInput>
                                {touched.skillsUsed && errors.skillsUsed && (
                                    <Text style={styles.errorTexts}>
                                        {errors.skillsUsed}
                                    </Text>
                                )}
                            </View>


                            <View style={{ width: '100%', backgroundColor: '', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '45%' }}>
                                    <TextInput
                                        onChangeText={handleChange('startingDate')}
                                        placeholder="Joining Date"
                                        style={styles.dateInputs}
                                        keyboardType='numeric'
                                    ></TextInput>
                                    {touched.startingDate && errors.startingDate && (
                                        <Text style={styles.errorTexts}>
                                            {errors.startingDate}
                                        </Text>
                                    )}
                                </View>
                                <View style={{ width: '4%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>~</Text>
                                </View>
                                <View style={{ width: '45%' }}>
                                    <TextInput
                                        onChangeText={handleChange('leavingDate')}
                                        placeholder="Leaving Date"
                                        style={styles.dateInputs}
                                        keyboardType='numeric'
                                    ></TextInput>
                                    {touched.leavingDate && errors.leavingDate && (
                                        <Text style={styles.errorTexts}>
                                            {errors.leavingDate}
                                        </Text>
                                    )}
                                </View>
                            </View>


                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={handleChange('ctc')}
                                    placeholder="CTC Recieved"
                                    style={styles.textInputs}
                                    keyboardType='numeric'
                                ></TextInput>
                                {touched.ctc && errors.ctc && (
                                    <Text style={styles.errorTexts}>
                                        {errors.ctc}
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

export default AddExperience