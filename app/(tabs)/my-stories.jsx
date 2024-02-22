import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PageWrapper from "../../components/page-wrapper";
import useMyStories from "../../hooks/useMyStories";
import StyledText from "../../components/styled-text";
import StoryBlock from "../../components/story-block";
import React, { useState } from "react";
import StyledButton from "../../components/styled-button";
import { Tabs, useRouter } from "expo-router";
import styleVariables from "../../constants/styleVariables";
import { AntDesign } from "@expo/vector-icons";

export default function MyStories() {
  const [refresh, setRefresh] = useState(0);
  const { data, isLoading } = useMyStories(refresh);

  return (
    <PageWrapper isLoading={isLoading && !data?.length} hasTabs>
      {!data?.length ? (
        <NoStories />
      ) : (
        <Stories data={data} updateList={() => setRefresh(refresh + 1)} />
      )}
    </PageWrapper>
  );
}

const NoStories = () => {
  const router = useRouter();
  return (
    <View>
      <StyledText>
        You haven't created any stories yet. Start creating stories to earn
        points to redeem when you are exploring!
      </StyledText>

      <StyledText />

      <StyledButton
        title={"Start Creating Now"}
        onPress={() => router.push("/add-story")}
      />
    </View>
  );
};

const Stories = ({ data, updateList }) => {
  return (
    <View>
      {data.map((story) => {
        return (
          <StoryBlock
            story={story}
            key={story.id}
            updateList={updateList}
            withActions
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  headerAction: {
    marginRight: styleVariables.gap,
  },
});
