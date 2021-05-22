import PropTypes from "prop-types";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

HeaderText.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string)
}

export default function HeaderText(props) {
  const { text } = props;

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
      <Text style={styles.text1}>{text[0]}</Text>
      <Text style={styles.text2}>{text[1]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text1: {
    color: "#555",
    fontSize: 16
  },
  text2: {
    fontSize: 24,
    fontWeight: "bold"
  },
})