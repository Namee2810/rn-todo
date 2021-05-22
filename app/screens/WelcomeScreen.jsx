import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { TODO_SET } from '../store/reducer';
import { globalStyles } from '../styles';
import { colors } from '../styles/colors';

function getDayName() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 4 && hour <= 12) return "morning";
  else if (hour > 12 && hour <= 18) return "afternoon";
  else if (hour > 18 && hour < 4) return "evening";
  else return "night";
}

export default function WelcomeScreen(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleTapScreen = () => {
    navigation.navigate("HomeTabs");
  }

  useEffect(() => {
    ToastAndroid.show("Loading data...", ToastAndroid.SHORT);
    const fetchData = async () => {
      const todoList = await AsyncStorage.getItem("todoList");
      (todoList?.length) && dispatch(TODO_SET(JSON.parse(todoList)));
      ToastAndroid.show("Loaded successfully", ToastAndroid.SHORT);
    }
    fetchData()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={handleTapScreen}>
      <LinearGradient
        colors={colors.gradientPrimary}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1, y: 1 }}
        style={[globalStyles.container, styles.container]}
      >
        <Text style={styles.welcomeText}>Good {getDayName()} master</Text>
        <Text style={styles.tapText}>TAP SCREEN TO NEXT</Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeText: {
    fontFamily: "Pacifico",
    color: "#fff",
    fontSize: 40
  },
  tapText: {
    position: "absolute",
    bottom: 10,
    color: "white",
    opacity: 0.8,
    fontSize: 12
  }
})