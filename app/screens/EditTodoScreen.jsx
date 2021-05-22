import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import Form from "../components/Form";
import HeaderText from '../components/HeaderText';
import Picker from '../components/Picker';
import { TODO_REMOVE, TODO_UPDATE } from '../store/reducer';
import { globalStyles } from '../styles';
import truncateStr from '../utils/truncateStr';
import types, { getTypeName, priorityTypes } from '../utils/types';

export default function AddTodoScreen(props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePicker, setTimePicker] = useState({
    mode: "date",
    temp: null
  })
  const [editingField, setEditingField] = useState({ type: "", field: "" });
  const [todo, setTodo] = useState(route.params?.item);

  useEffect(() => {
    navigation.setOptions({ title: truncateStr(todo.title, 20) })
  }, [todo])

  const handleUpdateTodo = () => {
    dispatch(TODO_UPDATE({ id: todo.id, todo: { ...todo, exp: new Date(todo.exp).getTime() } }))
    navigation.pop();
  }
  const handleRemoveTodo = () => {
    dispatch(TODO_REMOVE({ id: todo.id }))
    navigation.pop();
  }
  const handleEditField = (type, field) => {
    setEditingField({ type, field });
  }
  const handleSubmitForm = (value) => {
    value && setTodo({ ...todo, [editingField.field]: value });
    setEditingField({ type: "", field: "" });
  }
  const handleSelectPicker = (value) => {
    value && setTodo({ ...todo, [editingField.field]: value });
    setEditingField({ type: "", field: "" });
  }
  const handleChangeTime = (e, select) => {
    if (timePicker.mode === "date") {
      select ? setTimePicker({ ...timePicker, mode: "time", temp: select })
        : setShowTimePicker(false)
    }
    else {
      setShowTimePicker(false);
      setTimePicker({ ...timePicker, mode: "date" })
      if (select) {
        const date = new Date(timePicker.temp), time = new Date(select);
        const year = date.getFullYear(), month = date.getMonth(),
          day = date.getDate(), hours = time.getHours(), minutes = time.getMinutes();
        setTodo({ ...todo, exp: new Date(year, month, day, hours, minutes) })
      }
    }
  }

  return (
    <View style={[globalStyles.container, { backgroundColor: "white" }]}>
      <TouchableWithoutFeedback onPress={() => handleEditField("form", "title")}>
        <View>
          <HeaderText text={["Title", todo.title]} />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.form}>

        <TouchableWithoutFeedback onPress={() => handleEditField("form", "place")}>
          <View style={styles.field}>
            <AntDesign
              name="enviromento"
              color="#E691E6"
              style={[globalStyles.icon, styles.fieldIcon, { fontSize: 24, padding: 10 }]}
            />
            <View>
              <Text style={styles.fieldTitle}>Place</Text>
              <Text style={styles.fieldValue}>{todo.place}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setShowTimePicker(true)}>
          <View style={styles.field}>
            <AntDesign
              name="clockcircleo"
              color="#57A3DF"
              style={[globalStyles.icon, styles.fieldIcon]}
            />
            <View>
              <Text style={styles.fieldTitle}>Time</Text>
              <Text style={styles.fieldValue}>{format(todo.exp, "d MMM HH:mm")}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handleEditField("form", "note")}>
          <View style={styles.field}>
            <AntDesign
              name="filetext1"
              color="#FC869E"
              style={[globalStyles.icon, styles.fieldIcon]}
            />
            <View>
              <Text style={styles.fieldTitle}>Note</Text>
              <Text style={styles.fieldValue}>{todo.note}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handleEditField("picker", "priority")}>
          <View style={styles.field}>
            <Feather
              name="flag"
              color="#3EDBBE"
              style={[globalStyles.icon, styles.fieldIcon]}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldTitle}>Priority</Text>
              <Text style={styles.fieldValue}>{priorityTypes[todo.priority].label}</Text>
            </View>

          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handleEditField("picker", "type")}>
          <View style={styles.field}>
            <AntDesign
              name="tagso"
              color="#B7A7E8"
              style={[globalStyles.icon, styles.fieldIcon, { fontSize: 24, padding: 10 }]}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldTitle}>Type</Text>
              <Text style={styles.fieldValue}>{getTypeName(todo.type)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setTodo({ ...todo, alarm: !todo.alarm })} >
          <View style={styles.field}>
            <AntDesign
              name="bells"
              color="#FBCD91"
              style={[globalStyles.icon, styles.fieldIcon]}
            />
            <Text style={[styles.fieldValue, { flex: 1 }]}>Alarm</Text>
            <Switch
              thumbColor={todo.alarm ? "#4ADAC1" : "#d0d0d0"}
              onValueChange={() => setTodo({ ...todo, alarm: !todo.alarm })}
              value={todo.alarm}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleUpdateTodo}>
          <Button title="Save" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={handleRemoveTodo}>
          <Button style={{ marginTop: 15 }} title="Remove" type="cancel" />
        </TouchableOpacity>
      </View>
      <Form
        title={`Edit ${editingField.field}`}
        onSubmit={handleSubmitForm}
        defaultValue={todo[editingField.field] || ""}
        visible={editingField.type === "form" ? true : false}
      />
      <Picker
        title={`Select ${editingField.field}`}
        onSelect={handleSelectPicker}
        visible={editingField.type === "picker" ? true : false}
        data={editingField.field === "priority" ? priorityTypes : types}
      />
      {
        showTimePicker && <DateTimePicker
          value={new Date(todo.exp)}
          mode={timePicker.mode}
          is24Hour={true}
          onChange={handleChangeTime}
          minimumDate={new Date()}
          display="spinner"
        />
      }
    </View >
  )
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white"
  },
  form: {
    padding: 20
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25
  },
  fieldIcon: {
    fontSize: 20,
    padding: 12,
    marginRight: 15,
  },
  fieldTitle: {
    color: "rgba(0,0,0,0.4)",
  },
  fieldValue: {
    fontSize: 18,
  },
  addBtn: {
    margin: 0,
  },
  addText: {
    color: "white",
    fontSize: 18
  },
})