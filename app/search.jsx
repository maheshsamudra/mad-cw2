import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import PageWrapper from "../components/page-wrapper";
import StyledText from "../components/styled-text";
import cities from "../constants/cities";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../stores/useUserStore";
import styleVariables from "../constants/styleVariables";

export default function Search() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Select City",
        }}
      />

      {cities.map((city) => (
        <City city={city} key={city} />
      ))}
    </PageWrapper>
  );
}

const City = ({ city }) => {
  const userCity = useUserStore((state) => state.userCity);
  const setUserCity = useUserStore((state) => state.setUserCity);
  const router = useRouter();
  const isActive = city === userCity;
  return (
    <TouchableOpacity
      style={styles.cityWrapper}
      onPress={() => {
        setUserCity(city);
        setTimeout(() => {
          router.back();
        }, 200);
      }}
    >
      <Ionicons
        name={`radio-button-${isActive ? "on" : "off"}-outline`}
        size={20}
        color={isActive ? styleVariables.colors.primary : "#888888"}
        style={styles.radioButton}
      />
      <StyledText>{city}</StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cityWrapper: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    marginRight: 4,
  },
});
