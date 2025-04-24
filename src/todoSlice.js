import { createSlice } from "@reduxjs/toolkit";
import "./App.css";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const { text, deadline } = action.payload; 
      const newTodo = {
        id: Date.now(),
        text,
        deadline, 
        completed: false,
        completionDate: null, 
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        if (todo.completed) {
          todo.completionDate = new Date().toISOString();
        } else {
          todo.completionDate = null; 
        }
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;