import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./ui/AppText";

const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      onPress={() => onOpen(todo.id)}
      onLongPress={onRemove.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Todo;
