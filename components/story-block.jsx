import React from "react";
import styleVariables from "../constants/styleVariables";
import StyledText from "./styled-text";
import { format } from "date-fns";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { deleteStory, getMyStories } from "../services/firebase";
import useUserStore from "../stores/useUserStore";

const StoryBlock = ({
  story,
  updateList = () => null,
  withActions = false,
}) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const setMyStories = useUserStore((state) => state.setMyStories);

  const isMyStory = user?.uid === story.userId;

  const handleDelete = () => {
    if (!isMyStory) return;
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
            await deleteStory(story.id).then(() => {
              updateList();
            });
            await getMyStories().then((res) => setMyStories(res));
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "stories/view",
          params: { id: story.id, title: story.title },
        })
      }
      key={story.id}
      style={styles.storyWrapper}
    >
      <View>
        <StyledText variant={"storyTitle"}>{story.title}</StyledText>
        <StyledText variant={"metadata"}>
          {story.city} -{" "}
          {format(
            new Date(story.createdAt.seconds * 1000),
            "do MMM, yyyy hh:mm",
          )}
        </StyledText>
      </View>
      {withActions && isMyStory && (
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/stories/update",
                params: {
                  id: story.id,
                },
              })
            }
          >
            <AntDesign
              name="edit"
              size={20}
              color={styleVariables.colors.orange}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <AntDesign
              name="delete"
              size={20}
              color={styleVariables.colors.red}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default StoryBlock;

const styles = StyleSheet.create({
  storyWrapper: {
    marginBottom: styleVariables.gap,
    flexDirection: "row",
    width: "100%",
  },
  buttonsWrapper: { flexDirection: "row", marginLeft: "auto" },
  button: { marginLeft: 4, padding: 8 },
});
