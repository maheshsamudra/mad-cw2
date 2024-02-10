import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import React from "react";
import styleVariables from "../../constants/styleVariables";
import { Platform, StatusBar, View } from "react-native";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: styleVariables.colors.primary,
          headerTitleStyle: {
            fontFamily: styleVariables.fonts.bold,
          },
          tabBarStyle: {
            paddingTop: 4,
            paddingBottom: Platform.OS === "ios" ? 20 : 8,
            height: Platform.OS === "ios" ? 70 : 56,
          },
          tabBarLabelStyle: {
            fontFamily: styleVariables.fonts.regular,
            fontSize: 12,
          },
        }}
      >
        {tabs.map(
          ({
            name,
            title,
            icon,
            size = 24,
            tabBarIconStyle = {},
            href = null,
          }) => (
            <Tabs.Screen
              key={name}
              name={name}
              options={{
                title,
                tabBarIcon: ({ color }) => (
                  <View style={tabBarIconStyle}>
                    <AntDesign name={icon} size={size} color={color} />
                  </View>
                ),
              }}
            />
          ),
        )}
      </Tabs>

      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
    </>
  );
}

const tabs = [
  { name: "index", title: "Home", icon: "home" },
  { name: "my-stories", title: "My Stories", icon: "folder1" },
  {
    name: "add-story",
    title: "Add Story",
    icon: "pluscircleo",
    size: 42,
    tabBarIconStyle: {
      position: "absolute",
      bottom: 6,
      height: 42,
      width: 42,
      borderRadius: 42,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
  },
  { name: "leaderboard", title: "Leaderboard", icon: "flag" },
  { name: "profile", title: "Profile", icon: "user" },
];
