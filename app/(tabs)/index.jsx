import { ScrollView, StyleSheet } from "react-native";
import PageWrapper from "../../components/page-wrapper";
import useAllStories from "../../hooks/useAllStories";
import StoryBlock from "../../components/story-block";
import useUserStore from "../../stores/useUserStore";

export default function Home() {
  const userCity = useUserStore((state) => state.userCity);
  const { data, isLoading } = useAllStories(userCity);

  return (
    <PageWrapper isLoading={isLoading} hasTabs>
      {data.map((story) => {
        return <StoryBlock story={story} key={story.id} />;
      })}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
