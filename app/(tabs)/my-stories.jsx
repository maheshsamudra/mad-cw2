import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { handleLogout } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";
import useMyStories from "../../hooks/useMyStories";
import StyledText from "../../components/styled-text";
import styleVariables from "../../constants/styleVariables";
import { format } from "date-fns";
import { useRouter } from "expo-router";

export default function MyStories() {
  const { data, isLoading } = useMyStories();

  return (
    <PageWrapper isLoading={isLoading && !data?.length}>
      {!data?.length ? <NoStories /> : <Stories data={data} />}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});

const NoStories = () => {
  return <StyledText>No stories available</StyledText>;
};

const Stories = ({ data }) => {
  const router = useRouter();
  return (
    <View>
      {data.map((story) => {
        return (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "stories/view",
                params: { id: story.id, title: story.title },
              })
            }
            key={story.id}
            style={{ marginBottom: styleVariables.gap }}
          >
            <StyledText variant={"storyTitle"}>{story.title}</StyledText>
            <StyledText variant={"metadata"}>
              {story.city} -{" "}
              {format(
                new Date(story.createdAt.seconds * 1000),
                "do MMM, yyyy hh:mm",
              )}
            </StyledText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
