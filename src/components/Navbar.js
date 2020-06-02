import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { THEME } from "../theme";
import AppText from "./ui/AppText";

export default Navbar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIOS,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppText bold style={styles.text}>
        {title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIOS: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    color: Platform.OS === "android" ? "#fff" : "#202020",
    fontWeight: "500",
  },
});
