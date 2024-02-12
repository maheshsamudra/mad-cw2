import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import PageWrapper from "../../components/page-wrapper";
import useAllStories from "../../hooks/useAllStories";
import StoryBlock from "../../components/story-block";
import useUserStore from "../../stores/useUserStore";
import StyledText from "../../components/styled-text";
import cities from "../../constants/cities";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const userCity = useUserStore((state) => state.userCity);
  const [refresh, setRefresh] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading } = useAllStories(userCity, refresh);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefresh(new Date().toISOString());
  }, []);

  return (
    <PageWrapper
      isLoading={isLoading && !refreshing}
      hasTabs
      refreshControl={{ refreshing, onRefresh }}
    >
      {data.map((story) => {
        return <StoryBlock story={story} key={story.id} />;
      })}
      {!data?.length && <NoResults />}
    </PageWrapper>
  );
}

const NoResults = () => {
  const setUserCity = useUserStore((state) => state.setUserCity);
  return (
    <>
      <StyledText />
      <StyledText />
      <StyledText center>
        No results found. Please reset your search and try again.
      </StyledText>

      <StyledText />
      <StyledText />

      <TouchableOpacity onPress={() => setUserCity(cities?.[0])}>
        <StyledText center variant={"button"}>
          Clear City
        </StyledText>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
