import { Tabs, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import React from "react";
import styleVariables from "../../constants/styleVariables";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: styleVariables.colors.primary,
        headerTitleStyle: {
          fontFamily: styleVariables.fonts.medium,
        },
        tabBarStyle: {
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabelStyle: {
            fontFamily: styleVariables.fonts.regular,
            fontSize: 12,
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
