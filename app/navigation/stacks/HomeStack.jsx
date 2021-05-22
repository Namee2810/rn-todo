import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddTodoScreen from "../../screens/AddTodoScreen";
import EditTodoScreen from '../../screens/EditTodoScreen';
import HomeScreen from '../../screens/HomeScreen';
import SearchTodoScreen from '../../screens/SearchTodoScreen';

const Stack = createStackNavigator();

export default function HomeStack({ navigation, route }) {

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="AddTodo"
        component={AddTodoScreen}
        options={{
          headerShown: true,
          title: "Add Todo",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }}
      />
      <Stack.Screen
        name="EditTodo"
        component={EditTodoScreen}
        options={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <Stack.Screen
        name="SearchTodo"
        component={SearchTodoScreen}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}
      />
    </Stack.Navigator>
  )
}
