import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { THEME } from "../theme";
import AppCard from "../components/ui/AppCard";
import AppText from "../components/ui/AppText";
import EditModal from "../components/EditModal";
import AppButton from "../components/ui/AppButton";

const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  const saveHandler = async (title) => {
    await onSave(todo.id, title);
    setModal(false);
  };
  console.log(todo);

  return (
    <View>
      <EditModal
        value={todo.title}
        onCancel={() => setModal(false)}
        visible={modal}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppText bold style={styles.title}>
          {todo.title}
        </AppText>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={15} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={goBack} color={THEME.GRAY_COLOR}>
            <AntDesign name="back" size={15} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={() => onRemove(todo.id)}
            color={THEME.DANGER_COLOR}
          >
            <FontAwesome name="remove" size={15} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  button: {
    width: Dimensions.get("window").width / 3,
    // width: Dimensions.get("window").width > 400 ? 150 : 100,
  },
  title: {
    fontSize: 18,
  },
});

export default TodoScreen;
