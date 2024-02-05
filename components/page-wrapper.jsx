import React from "react";
import {Pressable, ScrollView, StyleSheet} from "react-native";
import StyledText from "./styled-text";
import styleVariables from "../constants/styleVariables";
import useUserStore from "../stores/useUserStore";

const PageWrapper = ({ children}) => {

    const userReady = useUserStore((state) => state.userReady);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    if (!userReady || !isLoggedIn) return null;

    return (
        <ScrollView>
            {children}
        </ScrollView>
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
