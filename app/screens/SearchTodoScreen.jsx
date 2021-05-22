import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useSelector } from 'react-redux'
import Picker from "../components/Picker"
import TodoItem from "../components/TodoItem"
import { globalStyles } from '../styles'
import { colors } from '../styles/colors'
import types, { getTypeName } from '../utils/types'

const width = Dimensions.get("screen").width;

export default function SeaSearchTodoScreen(props) {
  const { navigation } = props;

  const inputRef = useRef(null);
  const todoList = useSelector(state => state.todoList)
  const [search, setSearch] = useState({
    value: "",
    results: [],
    type: -1
  })
  const [typePickerVisible, setTypePickerVisible] = useState(false);

  const handleChangeText = (value) => {
    if (!value) return setSearch({ ...search, value: "", results: [], });

    let searchResults = [], searchValue = value.toLowerCase();
    searchResults = todoList.filter(item => (
      search.type === -1 ? item.title.toLowerCase().includes(searchValue)
        : (item.title.toLowerCase().includes(searchValue) && item.type === search.type)
    ))

    setSearch({ ...search, results: searchResults, value })
  }

  const handleSelectTypePicker = (value) => {
    value !== null && setSearch({ ...search, type: value })
    setTypePickerVisible(false);
  }

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, [])
  useEffect(() => {
    handleChangeText(search.value)
  }, [search.type])

  return (
    <View style={[globalStyles.containerSafe]}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <AntDesign name="search1" style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search ..."
            onChangeText={value => handleChangeText(value)}
          />
          <TouchableWithoutFeedback onPress={() => setTypePickerVisible(true)}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.pop()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={[globalStyles.container]}>
        {
          search.value ? (!search.results.length
            ? <View style={[globalStyles.container, globalStyles.center]}>
              <Text>No result for "{search.value}"{search.type > -1 && ` in ${getTypeName(search.type)}`}</Text>
            </View>
            : <>
              <Text style={{ marginVertical: 5, textAlign: "center" }}>
                {search.results.length} results for "{search.value}"{search.type > -1 && ` in ${getTypeName(search.type)}`}
              </Text>
              <FlatList
                data={search.results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TodoItem item={item} onPress={() => navigation.navigate("EditTodo", { item: item })} />}
              />
            </>) : null
        }
      </View>
      <Picker
        data={[{ label: "None", value: -1 }, ...types]}
        title="Select type"
        onSelect={handleSelectTypePicker}
        visible={typePickerVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchIcon: {
    fontSize: 22,
    color: "#777",
  },
  searchInput: {
    width: 0.55 * width,
    paddingHorizontal: 5,
  },
  filterText: {
    color: colors.primary
  },
  cancelText: {
    color: "#9f9f9f",
    marginLeft: 5,
    padding: 5
  }
})