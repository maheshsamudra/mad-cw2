import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import styleVariables from "../constants/styleVariables";
import StyledText from "./styled-text";

const StyledInput = ({
  label,
  value,
  setValue,
  placeholder,
  isPassword = false,
  multiline = false,
  style = {},
  ...props
}) => {
  return (
    <View style={styles.wrapper}>
      {label && <StyledText style={{ marginBottom: 4 }}>{label}</StyledText>}
      <TextInput
        editable
        style={[styles.input, multiline ? styles.textarea : {}, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={isPassword}
        multiline={multiline}
        {...props}
      />
    </View>
  );
};

export default StyledInput;

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: styleVariables.fonts.regular,
    fontSize: 16,
  },
  textarea: { minHeight: 200, maxHeight: 400 },
});
