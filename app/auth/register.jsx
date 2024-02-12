import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "../../components/styled-text";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { Link } from "expo-router";
import * as Updates from "expo-updates";

import { register, resendVerificationEmail } from "../../services/firebase";
import useUserStore from "../../stores/useUserStore";
import styleVariables from "../../constants/styleVariables";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState("");

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [errorMessage, setErrorMessage] = useState("");

  const [progress, setProgress] = useState(false);

  const createAccount = async () => {
    setErrorMessage("");
    setProgress(true);
    const res = await register(email, password, displayName);
    setErrorMessage(res?.errorMessage || "");
    setProgress(false);
  };

  if (user?.uid && !user?.emailVerified) {
    return (
      <>
        <View>
          <View style={{ marginHorizontal: styleVariables.gap }}>
            <StyledText center>
              Please verify your email to start using the app. Once the email is
              verified, the app will reload automatically.
            </StyledText>
            <StyledText />

            <StyledText center>Email address: {user.email}</StyledText>
            <StyledText />

            <TouchableOpacity onPress={resendVerificationEmail}>
              <StyledText center variant={"button"}>
                Resend Email
              </StyledText>
            </TouchableOpacity>

            <StyledText />
            <StyledText />

            <StyledText center>Already Verified?</StyledText>
            <StyledText />
            <TouchableOpacity
              onPress={() => {
                Updates.reloadAsync();
              }}
            >
              <StyledText center variant={"button"}>
                Refresh App
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

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
      <StyledInput
        label={"Email Address"}
        autoCapitalize={"none"}
        value={email}
        setValue={setEmail}
      />
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
