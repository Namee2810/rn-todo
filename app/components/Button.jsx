import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from "prop-types"
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles'
import { colors } from "../styles/colors"

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
}

export default function Button(props) {
  const { style, type, title } = props;

  return (
    !type ? <LinearGradient
      colors={colors.gradientPrimary}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[style, globalStyles.center, styles.button]}
    >
      <Text style={styles.text}>{title}</Text>
    </LinearGradient>
      : <View style={[style, globalStyles.center, styles.button, styles[type]]}>
        <Text style={styles.text}>{title}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  cancel: {
    backgroundColor: "#ababab"
  },
  text: {
    color: "#fff",
    fontSize: 16
  }
})