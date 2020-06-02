import React from "react";
import { StyleSheet, Text } from "react-native";

const AppText = (props) => {
  return (
    <Text
      style={
        props.bold
          ? { ...styles.bold, ...props.style }
          : { ...styles.default, ...props.style }
      }
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "roboto-regular",
  },
  bold: {
    fontFamily: "roboto-bold",
  },
});

export default AppText;
