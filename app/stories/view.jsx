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
import { deleteStory, getMyStories } from "../../services/firebase";
import useStory from "../../hooks/useStory";
import useUserStore from "../../stores/useUserStore";
import { format } from "date-fns";
import StyledButton from "../../components/styled-button";
import { AntDesign } from "@expo/vector-icons";
import styleVariables from "../../constants/styleVariables";
import { checkIfSaved, toggleFavourite } from "../../utils/favourite-stories";
import { useEffect, useState } from "react";

export default function ViewStory() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const setMyStories = useUserStore((state) => state.setMyStories);

  const user = useUserStore((state) => state.user);

  const { data, isLoading } = useStory(params.id);

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
          onPress: async () => {
            // delete and go back
            await deleteStory(params.id).then(() => {
              router.back();
            });

            await getMyStories().then((res) => setMyStories(res));
          },
        },
      ],
    );
  };

  const myStory = data?.userId === user?.uid;

  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    checkIfSaved(params.id).then((res) => setFavourite(res));
  }, []);

  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: params.title || data?.title || "View Story",
          headerRight: () => {
            if (isLoading) return null;
            if (!myStory) {
              return (
                <TouchableOpacity
                  onPress={() => toggleFavourite(data, setFavourite)}
                >
                  <AntDesign
                    name={favourite ? "heart" : "hearto"}
                    size={20}
                    color={favourite ? styleVariables.colors.primary : "black"}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity onPress={handleDelete}>
                <AntDesign
                  name="delete"
                  size={20}
                  color={styleVariables.colors.red}
                />
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
