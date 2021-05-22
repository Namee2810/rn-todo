import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from "../components/AddIcon";
import CategoryTodo from '../components/CategoryTodo';
import HeaderText from "../components/HeaderText";
import TodoItem from '../components/TodoItem';
import { globalStyles } from '../styles';

export default function HomeScreen(props) {
  const { navigation } = props;
  const todoList = useSelector(state => state.todoList)
  const dispatch = useDispatch();

  const handlePressItem = (value) => {
    navigation.navigate("AddTodo", { type: value })
  }

  useEffect(() => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });
  }, [])

  return (
    <View style={[globalStyles.containerSafe]}>
      <View style={styles.header}>
        <MaterialIcons name="segment" style={styles.menuBtn} />
        <TouchableNativeFeedback onPress={() => navigation.navigate("SearchTodo")}>
          <AntDesign name="search1" style={[styles.searchBtn, globalStyles.icon]} />
        </TouchableNativeFeedback>
      </View>
      {
        todoList.length ?
          <View style={[globalStyles.container]}>
            <HeaderText text={["Hey master", "what's your plan?"]} />
            <CategoryTodo onPressItem={handlePressItem} />
            <FlatList
              data={todoList}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <TodoItem
                  item={item}
                  onPress={() => navigation.navigate("EditTodo", { item: item })}
                />
              }
            />
          </View>
          : <View style={[globalStyles.containerSafe, globalStyles.center]}>
            <Text style={{ fontSize: 26 }}>¯\_(ツ)_/¯</Text>
            <Text style={{ fontSize: 16 }}>Hey master, you haven't planned yet anything</Text>
          </View>
      }
      <AddIcon onPress={() => navigation.navigate("AddTodo")} />
    </View >
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  menuBtn: {
    fontSize: 24,
    transform: [{ rotateY: "180deg" }]
  },
  searchBtn: {
    backgroundColor: "white",
  },
})