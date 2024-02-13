import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import StyledText from "./styled-text";
import styleVariables from "../constants/styleVariables";

const StyledButton = ({
  title = "Submit",
  onPress = () => null,
  progress = false,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (progress) return;
        onPress();
      }}
      style={[styles.button, progress ? styles.progress : {}, style]}
    >
      <StyledText style={styles.text}>{title}</StyledText>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: styleVariables.fonts.semiBold,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: styleVariables.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  progress: { opacity: 0.5 },
});
