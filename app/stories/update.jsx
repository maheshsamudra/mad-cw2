import { Button, ScrollView, StyleSheet } from "react-native";
import { handleLogout } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";

export default function UpdateStory() {
  return (
    <PageWrapper>
      <Button title={"Logout"} onPress={handleLogout} />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
