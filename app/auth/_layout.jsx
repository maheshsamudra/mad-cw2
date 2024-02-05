import {Slot, Tabs, useRouter} from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import React from "react";
import styleVariables from "../../constants/styleVariables";
import {Platform, ScrollView, StatusBar, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function AuthLayout() {

    const insets = useSafeAreaInsets();


    return (
        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                paddingBottom: insets.bottom,
            }}
        >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                        paddingTop: styleVariables.gap,
                        backgroundColor: "white",
                        flex: 1,
                        paddingHorizontal: styleVariables.gap,
                    }}
                >
                    <Slot />
                </ScrollView>

            <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
        </View>
    );
}


