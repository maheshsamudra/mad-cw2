import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import StyledText from "../../components/styled-text";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { Link } from "expo-router";
import { register } from "../../services/firebase";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [progress, setProgress] = useState(false);

  const createAccount = async () => {
    setErrorMessage("");
    setProgress(true);
    const res = await register(email, password, displayName);
    setErrorMessage(res?.errorMessage || "");
    setProgress(false);
  };

  return (
    <View>
      <View style={styles.header}>
        <StyledText center variant={"title"}>
          Welcome
        </StyledText>
        <StyledText center>Create your account to get started!</StyledText>
      </View>

      <StyledInput
        label={"Your Name"}
        value={displayName}
        setValue={setDisplayName}
      />
      <StyledInput label={"Email Address"} value={email} setValue={setEmail} />
      <StyledInput
        label={"Password"}
        value={password}
        setValue={setPassword}
        isPassword
      />

      <StyledButton
        title={"Get Started!"}
        onPress={createAccount}
        progress={progress}
      />

      {errorMessage && (
        <StyledText variant={"error"} center>
          {errorMessage}
        </StyledText>
      )}

      <Link href={"/auth/login"} style={styles.link}>
        <StyledText center>
          Already have an account?{" "}
          <StyledText style={styles.underline}>Log in.</StyledText>
        </StyledText>
      </Link>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  header: { marginBottom: 32 },
  link: { marginTop: 32 },
  underline: { textDecorationLine: "underline" },
});
