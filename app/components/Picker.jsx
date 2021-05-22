import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { globalStyles } from '../styles';
import ModalBottom from "./ModalBottom";

Picker.propTypes = {
  title: PropTypes.string,
  onSelect: PropTypes.func,
  visible: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  }))
}

export default function Picker(props) {
  const { title, onSelect, visible, data } = props;

  return (
    <ModalBottom visible={visible} onRequestClose={() => onSelect(null)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => onSelect("")}>
            <AntDesign name="close" style={[globalStyles.icon, styles.closeIcon, { color: "#f00" }]} />
          </TouchableWithoutFeedback>
          <Text style={styles.title}>{title}</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, idx) => "" + idx}
          renderItem={({ item }) =>
            <TouchableWithoutFeedback onPress={() => onSelect(item.value)}>
              <Text style={styles.item}>{item.label}</Text>
            </TouchableWithoutFeedback>
          }
        />
      </View>
    </ModalBottom >
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    maxHeight: 250
  },
  header: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    top: 5
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    left: 10
  },
  item: {
    textAlign: "center",
    paddingVertical: 15,
    fontSize: 16,
    borderTopWidth: 1,
    borderColor: "#f0f0f0"
  }
})