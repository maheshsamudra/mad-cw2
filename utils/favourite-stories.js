import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFavouriteStories = async () => {
  const value = await AsyncStorage.getItem("saved");
  return value ? JSON.parse(value) : [];
};

export const checkIfSaved = async (id, callback = () => null) => {
  const value = await AsyncStorage.getItem("saved");
  let existingFavourites = value ? JSON.parse(value) : [];

  const alreadyExists = !!existingFavourites.find((a) => a.id === id);

  callback(alreadyExists);

  return !!alreadyExists;
};

export const toggleFavourite = async (story, callback = () => null) => {
  if (!story.id) return;
  let existingFavourites = await getFavouriteStories();

  const alreadyExists = existingFavourites.find((a) => a.id === story.id);

  if (alreadyExists) {
    existingFavourites = existingFavourites.filter((a) => a.id !== story.id);
    callback(false);
  } else {
    existingFavourites.push(story);
    callback(true);
  }

  await AsyncStorage.setItem("saved", JSON.stringify(existingFavourites));
};
