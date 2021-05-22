import { format } from 'date-fns';
import PropTypes from "prop-types";
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from 'react-redux';
import { TODO_REMOVE, TODO_STATUS } from '../store/reducer';
import { globalStyles } from '../styles';
import { colors } from "../styles/colors";
import truncateStr from "../utils/truncateStr";

TodoItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func
}

export default function TodoItem(props) {
  const { item, onPress } = props;
  const exp = new Date(item.exp);
  const dispatch = useDispatch();

  const handlePressDone = () => {
    disptach(TODO_STATUS({ id: item.id }))
  }
  const getStyleStatus = (status) => {
    if (!status) return styles.checkIcon;
    else if (status === 1) return styles.checkDoneIcon;
    else if (status === 2) return styles.checkFailIcon
  }
  const handleRemoveTodo = () => {
    dispatch(TODO_REMOVE({ id: item.id }))
  }
  const swipeButtons = [
    {
      text: "Edit",
      onPress,
      backgroundColor: colors.primary,
    },
    {
      text: "Remove",
      onPress: handleRemoveTodo,
      backgroundColor: "#ababab",
    }
  ]

  return (
    <Swipeout
      right={swipeButtons}
      autoClose
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePressDone}>
          <AntDesign name={item.status === 2 ? "close" : "check"}
            style={[globalStyles.icon, getStyleStatus(item.status)]} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>
          {truncateStr(item.title, 25)}
        </Text>
        <Text style={styles.exp}>{format(exp, "d MMM HH:mm")}</Text>
        <AntDesign name="right" style={styles.rightIcon} />
      </View>
    </Swipeout>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff"
  },
  checkIcon: {
    fontSize: 18,
    color: "#ddd",
    backgroundColor: "white"
  },
  checkDoneIcon: {
    fontSize: 18,
    color: "white",
    backgroundColor: colors.primary
  },
  checkFailIcon: {
    fontSize: 18,
    color: "white",
    backgroundColor: colors.error
  },
  rightIcon: {
    marginLeft: 2,
    fontSize: 10,
    color: "#888",
  },
  title: {
    flex: 1,
    paddingHorizontal: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
  },
  exp: {
    color: "#888"
  }
})