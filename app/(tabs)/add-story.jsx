import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { saveStory } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";
import { useState } from "react";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { useRouter } from "expo-router";

export default function AddStory() {
  const [progress, setProgress] = useState(false);

  const [story, setStory] = useState({
    title: "Title",
    city: "Colombo",
    intro: "Intro",
    loved: "Loved",
    improvements: "Improvements",
    details: "Details",
    googleMapLink: "https://google.com",
  });

  const router = useRouter();

  const handleValue = (name, value) => {
    setStory({
      ...story,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setProgress(true);
    const res = await saveStory(story);
    setProgress(false);
    // setStory({});
    // router.push("/my-stories");
  };

  return (
    <PageWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }}>
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

        <StyledButton
          title={"Save"}
          onPress={handleSave}
          style={{ marginBottom: 48 }}
          progress={progress}
        />
      </KeyboardAvoidingView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
