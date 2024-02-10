import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import useAuthentication from "../hooks/useAuthentication";
import useUserStore from "../stores/useUserStore";
import styleVariables from "../constants/styleVariables";
import { KeyboardAvoidingView, Platform } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const userReady = useUserStore((state) => state.userReady);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useAuthentication();

  useEffect(() => {
    if (loaded && userReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, userReady]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerText: "",
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontFamily: styleVariables.fonts.bold,
        },
        contentStyle: {
          backgroundColor: "#fff",
        },
        screen: {
          unmountOnBlur: true,
          backgroundColor: "#fff",
        },
      }}
    />
  );
}
