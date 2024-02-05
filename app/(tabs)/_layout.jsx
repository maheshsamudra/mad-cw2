import {Slot, Tabs, useRouter} from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import React from "react";
import styleVariables from "../../constants/styleVariables";
import {Platform, ScrollView, StatusBar, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

  return (

        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >

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

            <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
        </View>

  );
}
