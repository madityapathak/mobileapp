import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'
import LoadingScreen from './LoadingScreen'
import Toast from 'react-native-toast-message'


function WorkDetails({navigation}) {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getData();
    }, []);


    function showToast(error) {
        Toast.show({
            type: 'error',
            text1: 'ERROR:404',
            text2: string(error),
            onPress: () => selecctImage()
        })
    }


    async function getData() {
        try {
            var keysArr = await AsyncStorage.getAllKeys();
            const allKeysArr = keysArr.filter(entry => entry.startsWith("workexp"));
            var allDataArr = await AsyncStorage.multiGet(allKeysArr);
            for (i = 0; i < allDataArr.length; i++) {
                allDataArr[i][1] = JSON.parse(allDataArr[i][1])
            }
            setData(allDataArr)
            setLoader(false)
        } catch (error) {
            showToast(error)
        }
    }





    return (

        <SafeAreaView style={styles.outerMostView}>
            <View style={styles.titleBar}>
                <Icon name="menuunfold" size={30} style={styles.menuButton} onPress={()=>{navigation.openDrawer();  }}  />
                <Text style={styles.headingText}>Experience</Text>
            </View>


            {loader ? (
                <LoadingScreen />
            ) : (
                <View style={{ flex: 1, marginTop: 22 }}>
                    <FlatList
                        numColumns={1}
                        data={data}
                        keyExtractor={item => item[0]}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={()=>navigation.navigate('WorkExperienceDetails', { data: item[0] })}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 250, marginBottom: 20 }}>
                                    <View style={{ width: '94%', height: 250, borderRadius: 7 }}>
                                        <Image source={{ uri: item[1].image }} style={{ width: '100%', height: 200 }} />
                                        <View style={{ backgroundColor: "#777E8B", justifyContent: 'center', alignItems: 'center', height: 50, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
                                            <Text style={{ fontFamily: 'Roboto-Medium', color: '#EAF0F1', letterSpacing: 0.5, fontSize: 16 }}>
                                                {item[1].companyName}
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
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
})

export default WorkDetails