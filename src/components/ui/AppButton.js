import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import AppText from "./AppText";
import { THEME } from "../../theme";

const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR }) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={onPress} activeOpacity={0.7}>
      <View style={{ ...styles.button, backgroundColor: color }}>
        <AppText bold style={styles.text}>
          {children}
        </AppText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});

export default AppButton;
