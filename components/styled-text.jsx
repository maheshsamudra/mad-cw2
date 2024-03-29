import React from "react";
import { StyleSheet, Text } from "react-native";
import styleVariables from "../constants/styleVariables";

const StyledText = ({
  children,
  variant = "normal",
  muted = false,
  style = {},
  center = false,
  ellipsis = false,
  singleLine = false,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.general,
        { opacity: muted ? 0.5 : 1 },
        styles?.variants?.[variant],
        ellipsis ? styles.ellipsis : {},
        center ? styles.center : {},
        style,
      ]}
      numberOfLines={singleLine ? 1 : null}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;

const styles = StyleSheet.create({
  general: {
    fontSize: 16,
    fontFamily: styleVariables.fonts.regular,
  },
  variants: {
    normal: {
      fontFamily: styleVariables.fonts.regular,
    },
    title: {
      fontSize: 20,
      fontFamily: styleVariables.fonts.bold,
      marginBottom: 6,
    },
    button: {
      textDecorationLine: "underline",
    },
    error: {
      color: "red",
      marginVertical: 8,
    },
    success: {
      color: "green",
      marginVertical: 8,
    },
    storyTitle: {
      fontSize: 16,
      fontFamily: styleVariables.fonts.bold,
      overflow: "hidden",
    },
    metadata: {
      color: "#888",
      fontSize: 14,
    },
  },
  muted: { opacity: 0.6 },
  center: { textAlign: "center" },
});
