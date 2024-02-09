import { Button, ScrollView, StyleSheet } from "react-native";
import { handleLogout } from "../../services/firebase";
import { Stack } from "expo-router";
import React from "react";
import StyledText from "../../components/styled-text";
import PageWrapper from "../../components/page-wrapper";

export default function CreateStory() {
  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Add Story",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
        }}
      />
      <StyledText>Hello</StyledText>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
