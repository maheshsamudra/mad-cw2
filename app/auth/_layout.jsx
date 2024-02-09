import { Slot, useRouter } from "expo-router";

import React, { useEffect } from "react";
import styleVariables from "../../constants/styleVariables";
import { Platform, ScrollView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useUserStore from "../../stores/useUserStore";
import useGuestPage from "../../hooks/useGuestPage";

export default function AuthLayout() {
  const insets = useSafeAreaInsets();

  useGuestPage();

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: insets.top + 50,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          paddingTop: styleVariables.gap,
          backgroundColor: "white",
          flex: 1,
          paddingHorizontal: styleVariables.gap,
        }}
      >
        <Slot />
      </View>

      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
    </View>
  );
}
