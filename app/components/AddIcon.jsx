import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { globalStyles } from '../styles';
import { colors } from '../styles/colors';

export default function AddIcon(props) {
  const { onPress } = props;

  return (
    <View style={[styles.container, globalStyles.center]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <LinearGradient
          colors={colors.gradientPrimary}
          style={[styles.linear, globalStyles.center]}
        >

          <AntDesign name="plus" color="white" style={styles.icon} />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 56,
    width: 56,
    borderRadius: 50,
    backgroundColor: "#fff"
  },
  linear: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  icon: {
    fontSize: 36
  }
})