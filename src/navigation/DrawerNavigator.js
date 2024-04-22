import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomNavigator from './BottomNavigator'
import AddExperience from '../screens/AddExperience'
import AddEducationalDetail from '../screens/AddEducationalDetail'
import CustomDrawer from './CustomDrawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



const Drawer = createDrawerNavigator()

function DrawerNavigator() {


    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false,drawerActiveBackgroundColor:'#0A3D62',drawerActiveTintColor:'white',drawerInactiveTintColor:'#333', drawerLabelStyle: { marginLeft: -25,fontFamily:'Roboto-Medium',fontSize:15,letterSpacing:0.3 } }} >
            <Drawer.Screen name='HOME' component={BottomNavigator} options={{
                drawerIcon: ({ color }) => (<Ionicons name='home-outline' size={22} color={color} />)
            }} />
            <Drawer.Screen name='ADD EDUCATION' component={AddEducationalDetail} options={{
                drawerIcon: ({ color }) => (<MaterialCommunityIcons name="book-education-outline" size={22} color={color} />)
            }} />
            <Drawer.Screen name='ADD EXPERIENCE' component={AddExperience} options={{
                drawerIcon: ({ color }) => (<MaterialIcons name="work-history"  size={22} color={color} />)
            }} />
        </Drawer.Navigator>
    )
}



export default DrawerNavigator