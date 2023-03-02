import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    transparentGray
} from '../utils/contants'
import styles from '../style/style'

import Selectinout from './tabs/SelectinoutScreen'
import Menu from './tabs/MenuScreen'
import Profile from './tabs/ProfileScreen'

const Tab = createBottomTabNavigator();
export default function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Selectinout"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#17A589',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ],
                tabBarIcon: ({ color }) =>
                    screenOptions(route, color),

            })}
            style={{ backgroundColor: 'white' }}>
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    // tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[styles.bottomTab]}>
                            <Icon name="grip-horizontal" color={color} size={25} />
                        </View>
                    ),
                    headerShown: false
                }} />
            <Tab.Screen
                name="Selectinout"
                component={Selectinout}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[styles.bottomTabCircle, styles.center]}>
                            <View style={[styles.bottomTabCenter, styles.center]}>
                                <Icon name="map-marker-alt" color={color} size={43} />
                            </View>
                        </View>
                    ),
                    headerShown: false
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    // tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[styles.bottomTab]}>
                            <Icon name="id-card-alt" color={color} size={25} />
                        </View>
                    ),
                    headerShown: false
                }} />
        </Tab.Navigator>
    )
}