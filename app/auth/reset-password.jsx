import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import StyledText from "../../components/styled-text";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { Link } from "expo-router";
import { sendPwResetEmail } from "../../services/firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(false);

  const [success, setSuccess] = useState(false);

  const requestPwReset = async () => {
    setProgress(true);
    const res = await sendPwResetEmail(email);
    setProgress(false);
    setSuccess(true);
  };

  return (
    <View>
      <View style={styles.header}>
        <StyledText center variant={"title"}>
          Reset Password
        </StyledText>
        <StyledText center>
          Enter the email address of your account. You will receive an email to
          reset your password.
        </StyledText>
      </View>

      <StyledInput label={"Email Address"} value={email} setValue={setEmail} />

      <StyledButton
        title={"Reset"}
        onPress={requestPwReset}
        progress={progress}
      />

      {success && (
        <StyledText center variant={"success"}>
          An email is sent to you with a link to reset the password. Please
          check the inbox.
        </StyledText>
      )}

      <Link href={"/auth/login"} style={styles.link}>
        <StyledText center style={styles.underline}>
          Back to Login
        </StyledText>
      </Link>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  header: { marginBottom: 32 },
  link: { marginTop: 32, backgroundColor: "white" },
  underline: { textDecorationLine: "underline" },
});
