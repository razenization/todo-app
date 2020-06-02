import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Navbar from "./components/Navbar";
import { THEME } from "./theme";
import MainScreen from "./screens/MainScreen";
import TodoScreen from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import ScreenContext from "./context/screen/screenContext";

const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen}
    />
  );

  if (todoId) {
    content = (
      <TodoScreen
        goBack={() => changeScreen(null)}
        todo={todos.find((item) => item.id === todoId)}
        onRemove={() => removeTodo(todoId)}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View style={styles.wrapper}>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export default MainLayout;
