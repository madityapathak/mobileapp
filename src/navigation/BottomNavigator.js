import React from "react"
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WorkDetails from "../screens/WorkDetails"
import EducationDetails from "../screens/EducationDetails"
import Profile from "../screens/Profile"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"




const Bottom = createBottomTabNavigator()

function BottomNavigator() {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Education"
        screenOptions={{
          tabBarActiveTintColor: "#0ABDE3",
          tabBarInactiveTintColor: '#616C6F',
        }}
        component={EducationDetails}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="book-education-outline" size={35} color={focused ? "#0ABDE3" : "#616C6f"} />
          ),
        }} />
      <Bottom.Screen name="Work"
        screenOptions={{
          tabBarActiveTintColor: "#0ABDE3",
          tabBarInactiveTintColor: '#616C6F',
        }}
        component={WorkDetails}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="work-history" size={35} color={focused ? "#0ABDE3" : "#616C6f"} />
          ),
        }} />
      <Bottom.Screen name="Profile"
        screenOptions={{
          tabBarActiveTintColor: "#0ABDE3",
          tabBarInactiveTintColor: '#616C6F',
        }}
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Entypo name="user" size={35} color={focused ? "#0ABDE3" : "#616C6f"} />
          ),
        }} />
    </Bottom.Navigator>
  )
}

export default BottomNavigator