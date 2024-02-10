import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import PageWrapper from "../../components/page-wrapper";
import StyledText from "../../components/styled-text";
import { deleteStory } from "../../services/firebase";
import useStory from "../../hooks/useStory";
import useUserStore from "../../stores/useUserStore";
import { format } from "date-fns";
import StyledButton from "../../components/styled-button";

export default function ViewStory() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const user = useUserStore((state) => state.user);

  const handleDelete = () => {
    Alert.alert(
      "You are about to delete this story",
      "This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue to Delete",
          onPress: () => {
            // delete and go back
            deleteStory(params.id).then(() => {
              router.back();
            });
          },
        },
      ],
    );
  };

  const { data, isLoading } = useStory(params.id);

  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: params.title || data?.title || "View Story",
          headerRight: () => {
            if (isLoading || data?.userId !== user?.uid) return null;
            return (
              <TouchableOpacity onPress={handleDelete}>
                <StyledText variant={"error"}>Delete</StyledText>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Story data={data} />
    </PageWrapper>
  );
}

const Story = ({ data }) => {
  if (!data.id) return <ActivityIndicator />;
  return (
    <>
      <StyledText>City: {data?.city}</StyledText>
      <StyledText>
        Posted at:{" "}
        {format(new Date(data.createdAt.seconds * 1000), "yyyy-MM-dd")}
      </StyledText>

      <StyledText variant={"storyTitle"} style={styles.storyTitle}>
        Introduction
      </StyledText>
      <StyledText>{data.intro}</StyledText>

      <StyledText variant={"storyTitle"} style={styles.storyTitle}>
        What I Loved
      </StyledText>
      <StyledText>{data.loved}</StyledText>

      <StyledText variant={"storyTitle"} style={styles.storyTitle}>
        What could be improved
      </StyledText>
      <StyledText>{data.improvements}</StyledText>

      <StyledText variant={"storyTitle"} style={styles.storyTitle}>
        Details
      </StyledText>
      <StyledText>{data.details}</StyledText>

      <StyledButton
        title={"View Map"}
        style={styles.button}
        onPress={() => {
          Linking.openURL(data.googleMapLink);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  storyTitle: { marginVertical: 10 },
  button: { marginVertical: 32 },
});
