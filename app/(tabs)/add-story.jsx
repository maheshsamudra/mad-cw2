import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { saveStory } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";
import React, { useState } from "react";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { Tabs, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import StyledText from "../../components/styled-text";
import styleVariables from "../../constants/styleVariables";

export default function AddStory() {
  const [progress, setProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [story, setStory] = useState({});

  const router = useRouter();

  const handleValue = (name, value) => {
    setStory({
      ...story,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setErrorMessage("");

    const isValid =
      story.title &&
      story.city &&
      story.intro &&
      story.loved &&
      story.details &&
      story.improvements &&
      story.googleMapLink;

    if (!isValid) {
      setErrorMessage("All the fields are required!");
      return;
    }
    setProgress(true);

    const res = await saveStory(story);
    setProgress(false);
    setStory({});
    router.push("/my-stories");
  };

  return (
    <PageWrapper hasTabs>
      <Tabs.Screen
        options={{
          headerTitle: errorMessage || "Add Story",
          headerTitleStyle: {
            color: errorMessage ? "red" : "black",
            fontFamily: styleVariables.fonts.semiBold,
            fontSize: errorMessage ? 14 : 17,
          },
          headerRight: () => {
            return (
              <View style={styles.headerAction}>
                {progress ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity onPress={handleSave}>
                    <StyledText variant={"success"}>Save</StyledText>
                  </TouchableOpacity>
                )}
              </View>
            );
          },
        }}
      />
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
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
  headerAction: {
    marginRight: styleVariables.gap,
  },
  keyboardAvoidingView: { flex: 1, paddingBottom: 40 },
});
