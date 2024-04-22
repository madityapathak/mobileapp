import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import ImageCropPicker, { openCamera, openCropper } from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Yup from 'yup'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import Toast from 'react-native-toast-message'
import LoadingScreen from './LoadingScreen';



const dateFormat = /^\d{4}$/;
// board :'',level :'',subjects :'',year :'',institution :''

const validationSchema = Yup.object().shape({
    board: Yup.string()
        .matches(/^[a-zA-z .]+$/, 'Invalid Characters used')
        .max(35, 'Max 35 characters')
        .required('Provide Examination Board'),
    level: Yup.string()
        .matches(/^[a-zA-z0-9 .]+$/, 'Invalid Characters used')
        .max(25, 'Maximum 25 characters')
        .required('Role is required'),
    subjects: Yup.string()
        .matches(/^[a-zA-z ,.]+$/, 'Invalid Characters used')
        .max(200, 'Maximum 200 characters')
        .required('Provide subjects'),
    year: Yup.string()
        .matches(dateFormat, 'YYYY')
        .required('Provide passing year'),
    institution: Yup.string()
        .matches(/^[a-zA-z0-9 .]+$/, 'Invalid Characters used')
        .max(35, 'Maximum 35 characters')
        .required('Provide Institution'),
})




function EditEducation({ route, navigation }) {
    const [loader, setLoader] = useState(true)
    const [image, setimage] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, []);


    async function getData() {
        try {
            var dataArr = await AsyncStorage.getItem(route.params.data);
            // use state work slow with big data arrays so avoid it if aoidable
            const fetched_data = JSON.parse(dataArr);
            setData(fetched_data)
            setimage(fetched_data.image)
            setLoader(false)

        } catch (error) {
            console.log(error)
        }
    }



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

    async function updateEducationDetail(board, level, subjects, year, institution) {
        let recieved_data = { image, board, level, subjects, year, institution }
        if (image) {
            await AsyncStorage.setItem(route.params.data, JSON.stringify(recieved_data))
            navigation.replace('DrawerNavigation');
        } else {
            showToast()
        }
    }

    return (

        <SafeAreaView style={styles.outerMostView}>
            <View style={styles.titleBar}>
                <Ionicons name="arrow-back" size={30} style={styles.menuButton} onPress={() => { navigation.goBack(); }} />
                <Text style={styles.headingText}>Add Education Detail</Text>
            </View>

            <View style={{ flex: 1 }}>
                {loader ? (
                    <LoadingScreen />
                ) : (
                    <Formik
                        initialValues={data}
                        // initialValues={{ board: '', level: '', subjects: '', year: '', institution: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => (
                            updateEducationDetail(board = values.board, level = values.level, subjects = values.subjects, year = values.year, institution = values.institution)
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
                                                <MaterialCommunityIcons name="book-education-outline" size={80} color='#616C6F' />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                    <Toast />

                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={handleChange('board')}
                                            placeholder="Board"
                                            style={styles.textInputs}
                                            value={values.board}
                                        ></TextInput>
                                        {touched.board && errors.board && (
                                            <Text style={styles.errorTexts}>
                                                {errors.board}
                                            </Text>
                                        )}
                                    </View>

                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={handleChange('level')}
                                            placeholder="Level"
                                            style={styles.textInputs}
                                            value={values.level}
                                        ></TextInput>
                                        {touched.level && errors.level && (
                                            <Text style={styles.errorTexts}>
                                                {errors.level}
                                            </Text>
                                        )}
                                    </View>

                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={handleChange('year')}
                                            placeholder="Passing Year"
                                            style={styles.textInputs}
                                            keyboardType='numeric'
                                            value={values.year}
                                        ></TextInput>
                                        {touched.year && errors.year && (
                                            <Text style={styles.errorTexts}>
                                                {errors.year}
                                            </Text>
                                        )}
                                    </View>


                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={handleChange('subjects')}
                                            placeholder="Subjects"
                                            style={styles.textInputs}
                                            value={values.subjects}
                                        ></TextInput>
                                        {touched.subjects && errors.subjects && (
                                            <Text style={styles.errorTexts}>
                                                {errors.subjects}
                                            </Text>
                                        )}
                                    </View>




                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={handleChange('institution')}
                                            placeholder="Institution"
                                            style={styles.textInputs}
                                            value={values.institution}
                                        ></TextInput>
                                        {touched.institution && errors.institution && (
                                            <Text style={styles.errorTexts}>
                                                {errors.institution}
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
                )}
            </View>
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

export default EditEducation