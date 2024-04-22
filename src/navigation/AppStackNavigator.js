import React from "react";
import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import DrawerNavigator from "./DrawerNavigator";
import SetUserDetails from "../screens/SetUserDetails";
import WorkDetails from "../screens/WorkDetails";
import WorkExperienceDetail from "../screens/WorkExperienceDetail";
import EachLevelDetail from "../screens/EachLevelDetail";
import EditProfile from "../screens/EditProfile";
import EditEducation from "../screens/EditEducation";
import EditExperience from "../screens/EditExperience";





const Stack = createNativeStackNavigator();

function AppStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigation"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SetUserDetails"
                    component={SetUserDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WorkExperienceList"
                    component={WorkDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WorkExperienceDetails"
                    component={WorkExperienceDetail}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="EachLevelDetail"
                    component={EachLevelDetail}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="EditUserDetail"
                    component={EditProfile}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="EditExperience"
                    component={EditExperience}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="EditEducation"
                    component={EditEducation}
                    options={{ headerShown: false }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AppStackNavigator