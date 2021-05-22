import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";
import CalendarScreen from "../screens/CalendarScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StatisticScreen from "../screens/StatisticScreen";
import HomeStack from "./stacks/HomeStack";

const Tab = createBottomTabNavigator();

export default function Tabs({ navigation }) {

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#ccc',
        showLabel: false,
      }}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="HomeStack" component={HomeStack}
        options={({ route }) => ({
          //tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
        })}
      />
      <Tab.Screen
        name="Statistic" component={StatisticScreen}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="barschart" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Calendar" component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="calendar" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Settings" component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="setting" size={size} color={color} />
        }}
      />
    </Tab.Navigator >
  )
}
