import { StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import PageWrapper from "../components/page-wrapper";
import StyledText from "../components/styled-text";
import styleVariables from "../constants/styleVariables";
import { pointsPerStory } from "../constants";

export default function AboutRewardPoints() {
  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Reward Points",
        }}
      />

      <StyledText />
      <StyledText />

      <StyledText variant={"title"} center>
        1 story = {pointsPerStory} points
      </StyledText>

      <StyledText />

      <StyledText style={styles.paragraph}>
        "Welcome to our exciting reward scheme tailored just for you! 🎉 Explore
        the beauty of Sri Lanka like never before with our innovative app, where
        you can share captivating stories about various locations across the
        island.
      </StyledText>

      <StyledText style={styles.paragraph}>
        Every story you add not only enriches our platform but also earns you 10
        valuable points! 🌟 These points are your ticket to unlocking exclusive
        rewards from a plethora of stores scattered across Sri Lanka. Whether
        it's indulging in delicious cuisine, treating yourself to exquisite
        handicrafts, or experiencing thrilling adventures, the possibilities are
        endless!
      </StyledText>

      <StyledText style={styles.paragraph}>
        So, embark on your journey with us, share your tales, and let the
        rewards flow. Start earning points today and turn your exploration into
        unforgettable experiences!"
      </StyledText>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: styleVariables.gap,
  },
});
