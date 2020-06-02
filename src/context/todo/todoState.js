import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from "../types";
import ScreenContext from "../screen/screenContext";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://todo-app-5d6d2.firebaseio.com/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (err) {
      showError(err.message);
    }
  };

  const removeTodo = (id) => {
    clearError();
    const todo = state.todos.find((item) => item.id === id);
    Alert.alert(
      "Удаление дела",
      `Вы уверены что хотите удалить ${todo.title}?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            try {
              changeScreen(null);
              await Http.delete(
                `https://todo-app-5d6d2.firebaseio.com/todos/${id}.json`
              );
              dispatch({ type: REMOVE_TODO, id });
            } catch (err) {
              showError(err.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://todo-app-5d6d2.firebaseio.com/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (err) {
      showError(err.message);
    }
  };

  const fetchTodos = async () => {
    clearError();
    showLoader();
    try {
      const response = await fetch(
        "https://todo-app-5d6d2.firebaseio.com/todos.json",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      let todos = [];
      if (data) {
        todos = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
      }
      dispatch({ type: FETCH_TODOS, todos });
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        error: state.error,
        loading: state.loading,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
