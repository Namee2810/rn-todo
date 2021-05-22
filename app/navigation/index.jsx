import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import WelcomeScreen from "../screens/WelcomeScreen";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="HomeTabs"
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
