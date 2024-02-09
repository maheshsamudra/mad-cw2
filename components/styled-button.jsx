import React from "react";
import { Pressable, StyleSheet } from "react-native";
import StyledText from "./styled-text";
import styleVariables from "../constants/styleVariables";

const StyledButton = ({
  title = "Submit",
  onPress = () => null,
  progress = false,
}) => {
  return (
    <Pressable
      onPress={() => {
        if (progress) return;
        onPress();
      }}
      style={[styles.button, progress ? styles.progress : {}]}
    >
      <StyledText style={styles.text}>{title}</StyledText>
    </Pressable>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: styleVariables.fonts.medium,
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
