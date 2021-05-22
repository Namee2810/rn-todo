import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { globalStyles } from '../styles';
import { colors } from '../styles/colors';
import ModalBottom from "./ModalBottom";

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.string,
  visible: PropTypes.bool,
  value: PropTypes.string
}

export default function Form(props) {
  const { title, onSubmit, defaultValue, visible } = props;
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    visible && setTimeout(() => {
      inputRef.current?.focus()
    }, 500);
  }, [visible])

  return (
    <ModalBottom visible={visible} onRequestClose={() => onSubmit("")}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => onSubmit("")}>
            <AntDesign name="close" style={[globalStyles.icon, { color: colors.error }]} />
          </TouchableWithoutFeedback>
          <Text style={styles.title}>{title}</Text>
          <TouchableWithoutFeedback onPress={() => onSubmit(text)}>
            <AntDesign name="check" style={[globalStyles.icon, { color: colors.primary }]} />
          </TouchableWithoutFeedback>
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={text => setText(text)}
          defaultValue={defaultValue || ""}
        />
      </View>
    </ModalBottom>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
  },
  input: {
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 15,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 16,
  },
})