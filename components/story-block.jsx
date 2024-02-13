import React from "react";
import styleVariables from "../constants/styleVariables";
import StyledText from "./styled-text";
import { format } from "date-fns";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
      {story?.images?.[0] ? (
        <Image source={{ uri: story?.images?.[0] }} style={styles.image} />
      ) : null}
      <View style={styles.text}>
        <StyledText variant={"storyTitle"} ellipsis singleLine>
          {story.title}
        </StyledText>
        <StyledText variant={"metadata"}>
          {story.city} -{" "}
          {format(
            new Date(story.createdAt.seconds * 1000),
            "do MMM, yyyy hh:mm",
          )}
        </StyledText>

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
      </View>
    </TouchableOpacity>
  );
};

export default StoryBlock;

const styles = StyleSheet.create({
  storyWrapper: {
    marginBottom: styleVariables.gap,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    paddingRight: 10,
    flexWrap: "wrap",
  },
  text: {
    paddingLeft: 20,
    paddingVertical: 20,
    width: "100%",
    flex: 1,
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: { marginTop: 8, marginRight: 4, padding: 8 },
  image: {
    height: "100%",
    width: 100,
    marginRight: -10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
