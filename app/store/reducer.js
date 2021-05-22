import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const slice = createSlice({
  name: "todo",
  initialState: {
    todoList: [
    ],
  },
  reducers: {
    TODO_SET(state, action) {
      state.todoList = action.payload;
    },
    TODO_ADD(state, action) {
      state.todoList.unshift(action.payload)
      Toast.show({ type: "success", text1: "Nice", text2: "Added successfully 👏" })

      AsyncStorage.setItem("todoList", JSON.stringify(state.todoList))
    },
    TODO_REMOVE(state, action) {
      const { id } = action.payload;
      const idx = state.todoList.findIndex(i => i.id === id);
      state.todoList.splice(idx, 1);
      Toast.show({ type: "success", text1: "Nice", text2: "Removed successfully 👏" })

      AsyncStorage.setItem("todoList", JSON.stringify(state.todoList))
    },
    TODO_STATUS(state, action) {
      const { id, status } = action.payload;
      const idx = state.todoList.findIndex(i => i.id === id);

      if (status) return state.todoList[idx].status = status;

      const currentStatus = state.todoList[idx].status;
      if (currentStatus < 2) state.todoList[idx].status += 1;
      else state.todoList[idx].status = 0;

      AsyncStorage.setItem("todoList", JSON.stringify(state.todoList))
    },
    TODO_UPDATE(state, action) {
      const { id, todo } = action.payload;
      const idx = state.todoList.findIndex(i => i.id === id);
      state.todoList[idx] = todo;
      Toast.show({ type: "success", text1: "Nice", text2: "Edited successfully 👏" })

      AsyncStorage.setItem("todoList", JSON.stringify(state.todoList))
    }
  }
})

const { actions, reducer } = slice;
export const { TODO_ADD, TODO_REMOVE, TODO_STATUS, TODO_UPDATE, TODO_SET } = actions;
export default reducer;
