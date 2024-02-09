import { Button, ScrollView, StyleSheet } from "react-native";
import { handleLogout } from "../../services/firebase";
import StyledText from "../../components/styled-text";
import PageWrapper from "../../components/page-wrapper";

export default function AddStory() {
  return (
    <PageWrapper>
      <StyledText>Add Story</StyledText>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
