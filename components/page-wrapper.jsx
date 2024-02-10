import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import styleVariables from "../constants/styleVariables";
import useUserStore from "../stores/useUserStore";
import { useRootNavigationState, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PageWrapper = ({ children, isLoading }) => {
  const insets = useSafeAreaInsets();

  const userReady = useUserStore((state) => state.userReady);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const rootNavigationState = useRootNavigationState();

  const router = useRouter();

  const navigatorReady = rootNavigationState?.key != null;

  useEffect(() => {
    if (!userReady) return;

    if (!isLoggedIn && navigatorReady) {
      router.push("/auth/register");
    }
  }, [isLoggedIn, userReady, navigatorReady]);

  if (!userReady || !isLoggedIn) return null;

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView>
        <View
          style={{
            marginHorizontal: styleVariables.gap,
            marginTop: styleVariables.gap,
          }}
        >
          {!isLoading ? children : <ActivityIndicator />}
        </View>
      </ScrollView>
    </View>
  );
};

export default PageWrapper;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: styleVariables.fonts.medium,
    fontSize: 16,
  },
  button: {
    backgroundColor: styleVariables.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
});
