import { Button, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { handleLogout } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";

export default function ViewStory() {
  const params = useLocalSearchParams();
  return (
    <PageWrapper>
      <Stack.Screen
        options={{ headerShown: true, title: params.title || "View Story" }}
      />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
