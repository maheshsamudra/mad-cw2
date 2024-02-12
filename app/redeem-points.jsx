import { StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import PageWrapper from "../components/page-wrapper";
import StyledInput from "../components/styled-input";
import StyledButton from "../components/styled-button";
import StyledText from "../components/styled-text";

export default function RedeemPoints() {
  const router = useRouter();

  const handleRedeem = async () => {};

  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Redeem Points",
        }}
      />

      <StyledText />

      <StyledInput label={"Points to Redeem"} />
      <StyledButton title={"Redeem"} onPress={handleRedeem} />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    marginRight: 4,
  },
});
