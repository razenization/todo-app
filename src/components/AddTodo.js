import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";

const AddTodo = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onAdd(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Название todo не может быть пустым!");
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введите название дела..."
        autoCorrect={false}
      />
      <AntDesign.Button onPress={() => pressHandler(value)} name="pluscircleo">
        Добавить
      </AntDesign.Button>
      {/* <Button
        style={styles.button}
        title="Добавить"
        onPress={() => pressHandler(value)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  input: {
    borderStyle: "solid",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    width: "60%",
    fontSize: 20,
  },
  button: {
    width: "30%",
  },
});

export default AddTodo;
