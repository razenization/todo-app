import React, { useState, useEffect, useContext, useCallback } from "react";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import AppText from "../components/ui/AppText";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import ScreenContext from "../context/screen/screenContext";
import AppLoader from "../components/ui/AppLoader";
import AppButton from "../components/ui/AppButton";

const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);
    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Retry</AppButton>
      </View>
    );
  }

  let content = (
    <View
      style={{
        width: deviceWidth,
      }}
    >
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/no-items.png")}
        ></Image>
        <AppText style={styles.text}>Пока нет дел...</AppText>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onAdd={addTodo} />

      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    marginBottom: 10,
  },
});

export default MainScreen;
