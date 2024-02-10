import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { handleLogout, saveStory, updateStory } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useStory from "../../hooks/useStory";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { useEffect, useState } from "react";
import StyledText from "../../components/styled-text";

export default function UpdateStory() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [progress, setProgress] = useState(false);

  const { data, isLoading } = useStory(params.id);

  const [story, setStory] = useState({});

  useEffect(() => {
    if (isLoading || !data) return;
    setStory(data);
  }, [isLoading, data]);

  const handleValue = (name, value) => {
    setStory({
      ...story,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    setProgress(true);
    const res = await updateStory(story);
    setProgress(false);
    setStory({});
    router.push("/my-stories");
  };

  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Update Story",
          headerRight: () => {
            if (progress || isLoading) {
              return <ActivityIndicator />;
            }
            return (
              <TouchableOpacity onPress={handleUpdate}>
                <StyledText variant={"success"}>Save</StyledText>
              </TouchableOpacity>
            );
          },
        }}
      />
      {!isLoading && (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <StyledInput
            value={story?.title}
            setValue={(value) => handleValue("title", value)}
            label={"Title"}
          />

          <StyledInput
            value={story?.city}
            setValue={(value) => handleValue("city", value)}
            label={"City"}
          />

          <StyledInput
            value={story?.intro}
            setValue={(value) => handleValue("intro", value)}
            label={"Intro"}
            multiline={true}
          />

          <StyledInput
            value={story?.loved}
            setValue={(value) => handleValue("loved", value)}
            label={"What I Loved"}
            multiline={true}
          />

          <StyledInput
            value={story?.improvements}
            setValue={(value) => handleValue("improvements", value)}
            label={"What could be improved"}
            multiline={true}
          />

          <StyledInput
            value={story?.details}
            setValue={(value) => handleValue("details", value)}
            label={"Details"}
            multiline={true}
          />

          <StyledInput
            value={story?.googleMapLink}
            setValue={(value) => handleValue("googleMapLink", value)}
            label={"Google Map Link"}
            inputMode={"url"}
          />
        </KeyboardAvoidingView>
      )}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1, paddingBottom: 40 },
});
