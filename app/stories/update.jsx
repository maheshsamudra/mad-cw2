import { Button, StyleSheet } from "react-native";
import { handleLogout } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";
import { Stack, useLocalSearchParams } from "expo-router";

export default function UpdateStory() {
  const params = useLocalSearchParams();
  return (
    <PageWrapper>
      <Stack.Screen options={{ headerShown: true, title: "Update Story" }} />
      <Button title={"Logout"} onPress={handleLogout} />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
