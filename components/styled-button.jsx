import React from "react";
import { Pressable, StyleSheet } from "react-native";
import StyledText from "./styled-text";
import styleVariables from "../constants/styleVariables";

const StyledButton = ({ title = "Submit", onPress = () => null }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
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
  },
  button: {
    backgroundColor: styleVariables.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
});
