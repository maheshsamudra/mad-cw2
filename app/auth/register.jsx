import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "../../components/styled-text";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { Link } from "expo-router";
import * as Updates from "expo-updates";
import Logo from "../../assets/icon.png";

import {
  handleLogout,
  register,
  resendVerificationEmail,
} from "../../services/firebase";
import useUserStore from "../../stores/useUserStore";
import styleVariables from "../../constants/styleVariables";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState("");

  const user = useUserStore((state) => state.user);

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
        <View style={{ alignItems: "center" }}>
          <Image
            source={Logo}
            style={{
              height: 96,
              width: 96,
              justifyContent: "center",
              flexDirection: "row",
            }}
          />
          <View style={{ marginHorizontal: styleVariables.gap }}>
            <StyledText center variant={"title"}>
              Welcome to Travel Buddy
            </StyledText>
            <StyledText />
            <StyledText center>
              Please verify your email to start using the app. Once verified,
              tap the Refresh button to start using the app.
            </StyledText>
            <StyledText />

            <StyledText center>Email address: {user.email}</StyledText>
            <StyledText />

            <StyledButton
              onPress={() => Updates.reloadAsync()}
              title={"Refresh"}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 32,
              }}
            >
              <TouchableOpacity onPress={resendVerificationEmail}>
                <StyledText center variant={"button"}>
                  Resend Email
                </StyledText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <StyledText center variant={"button"}>
                  Logout
                </StyledText>
              </TouchableOpacity>
            </View>

            <StyledText />
            <StyledText />
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
