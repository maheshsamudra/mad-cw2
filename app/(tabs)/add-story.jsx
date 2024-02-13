import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getMyStories, getStory, saveStory } from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";
import React, { useEffect, useState } from "react";
import StyledInput from "../../components/styled-input";
import StyledButton from "../../components/styled-button";
import { Tabs, useRouter } from "expo-router";
import StyledText from "../../components/styled-text";
import styleVariables from "../../constants/styleVariables";
import useUserStore from "../../stores/useUserStore";
import cities from "../../constants/cities";
import * as ImagePicker from "expo-image-picker";

export default function AddStory() {
  const [progress, setProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setMyStories = useUserStore((state) => state.setMyStories);

  const [images, setImages] = useState([]);

  const userCity = useUserStore((state) => state.userCity);
  const setUserCity = useUserStore((state) => state.setUserCity);

  const [story, setStory] = useState({
    images: getImages(),
    city: getStoryCity(userCity),
  });

  useEffect(() => {
    handleValue("city", getStoryCity(userCity));
  }, [userCity]);

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
    setStory({ images: getImages() });
    setUserCity(cities[0]);

    await getMyStories().then((res) => setMyStories(res));
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
        <StyledButton
          title={story.city ? `Selected City: ${story.city}` : "Select City"}
          onPress={() => router.push("search")}
          style={{ marginVertical: 20 }}
        />

        {story.city && (
          <>
            <StyledButton
              title={"Select Images"}
              style={{ marginVertical: 20 }}
              onPress={async () => {
                const { assets } = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  aspect: [16, 9],
                  quality: 1,
                  allowsMultipleSelection: true,
                });

                setImages(assets || []);
              }}
            />

            {!!images?.length && (
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                data={images}
                renderItem={({ item, index }) => {
                  return (
                    <Image
                      source={{ uri: item.uri }}
                      key={item.assetId}
                      style={{
                        height: 150,
                        width: 200,
                        marginLeft: !index ? 0 : 10,
                        marginBottom: 16,
                      }}
                    />
                  );
                }}
              />
            )}

            <StyledInput
              value={story?.title}
              setValue={(value) => handleValue("title", value)}
              label={"Title"}
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
              autoCapitalize={"none"}
            />
          </>
        )}
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

const images = [
  "https://plus.unsplash.com/premium_photo-1666254114402-cd16bc302aea?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1681223447322-46794b8cdfd5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1552055569-b7e1e45d5be8?q=80&w=1802&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const getImages = (array = images) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getStoryCity = (city) => (city !== cities[0] ? city : "");
