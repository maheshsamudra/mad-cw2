import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styleVariables from "../constants/styleVariables";

const StyledText = ({
  children,
  variant = "normal",
  muted = false,
  style = {},
  center = false,
  ellipsis = false,
  ...props
}) => {
  return (
    <Text
      style={[
        { opacity: muted ? 0.5 : 1 },
        styles?.variants?.[variant],
        ellipsis ? styles.ellipsis : {},
        center ? styles.center : {},
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;

const styles = StyleSheet.create({
  variants: {
    normal: {
      fontSize: 16,
      fontFamily: styleVariables.fonts.regular,
    },
    title: {
      fontSize: 16,
      fontFamily: styleVariables.fonts.bold,
    },
  },
  center: { textAlign: "center" },
});
