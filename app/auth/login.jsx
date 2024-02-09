import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import StyledText from "../../components/styled-text";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { Link } from "expo-router";
import { login } from "../../services/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [progress, setProgress] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    setProgress(true);
    const res = await login(email, password);
    setErrorMessage(res?.errorMessage || "");
    setProgress(false);
  };

  return (
    <View>
      <View style={styles.header}>
        <StyledText center variant={"title"}>
          Welcome back!
        </StyledText>
        <StyledText center>Create your account to get started!</StyledText>
      </View>

      <StyledInput label={"Email Address"} value={email} setValue={setEmail} />
      <StyledInput
        label={"Password"}
        value={password}
        setValue={setPassword}
        isPassword
      />

      <StyledButton
        title={"Continue"}
        onPress={handleLogin}
        progress={progress}
      />

      {errorMessage && (
        <StyledText variant={"error"} center>
          {errorMessage}
        </StyledText>
      )}

      <Link href={"/auth/register"} style={styles.link}>
        <StyledText center>
          New here?{" "}
          <StyledText style={styles.underline}>Get started!</StyledText>
        </StyledText>
      </Link>

      <Link href={"/auth/reset-password"} style={styles.link}>
        <StyledText center style={styles.underline}>
          Forgot password?
        </StyledText>
      </Link>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: { marginBottom: 32 },
  link: { marginTop: 32, backgroundColor: "white" },
  underline: { textDecorationLine: "underline" },
});
