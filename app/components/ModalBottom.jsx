import PropTypes from "prop-types";
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

ModalBottom.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func
}

export default function ModalBottom(props) {
  const { visible, onRequestClose } = props;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onRequestClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container]}>
          {props.children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    flex: 1,
    justifyContent: "flex-end"
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
})