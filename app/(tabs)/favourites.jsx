import { StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import PageWrapper from "../../components/page-wrapper";
import StyledText from "../../components/styled-text";
import useFavouriteStories from "../../hooks/useFavouriteStories";
import StoryBlock from "../../components/story-block";

export default function FavouriteStories() {
  const { data, isLoading } = useFavouriteStories();

  return (
    <PageWrapper isLoading={isLoading && !data?.length} hasTabs>
      {!data?.length && (
        <View>
          <StyledText>You don't have any favourite stories yet.</StyledText>

          <StyledText />
        </View>
      )}

      {data.map((story) => {
        return <StoryBlock story={story} key={story.id} />;
      })}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    marginRight: 4,
  },
});
