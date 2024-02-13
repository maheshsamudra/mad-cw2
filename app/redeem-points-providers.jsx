import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import PageWrapper from "../components/page-wrapper";
import StyledText from "../components/styled-text";
import { Entypo } from "@expo/vector-icons";
import styleVariables from "../constants/styleVariables";

const providers = [
  {
    name: "Jetwing",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnF5cMzFGzIDgRrlJz9m88oko_frV9zx_mpw&usqp=CAU",
    items: [
      {
        points: 10,
      },
      {
        points: 25,
      },
      {
        points: 50,
      },
    ],
  },
  {
    name: "Uga",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9recPbJhxbSU-Xa2-wrPv80_e2jyyPf4CsFYlrUFMz_xPTHgvRMSP-xzRlxd4dndgPWI&usqp=CAU",
    items: [
      {
        points: 10,
      },
      {
        points: 25,
      },
      {
        points: 50,
      },
    ],
  },
  {
    name: "Cinnamon Resorts",
    image: "https://static.brandirectory.com/logos/cinn001_cinnamon.jpg",
    items: [
      {
        points: 10,
      },
      {
        points: 25,
      },
      {
        points: 50,
      },
    ],
  },
  {
    name: "Thema Collection",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlydmsQdRFculb0JKbq3MmPtSSQu0bBO-FKkYsS-Y4Q&s",
    items: [
      {
        points: 10,
      },
      {
        points: 25,
      },
      {
        points: 50,
      },
    ],
  },
];

export default function RedeemPoints() {
  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Providers",
        }}
      />

      <StyledText />

      {providers.map((provider) => (
        <Provider data={provider} key={provider.name} />
      ))}
    </PageWrapper>
  );
}

const Provider = ({ data }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.providerWrapper}
      onPress={() => {
        router.push({
          pathname: "redeem-points",
          params: {
            data: JSON.stringify(data),
          },
        });
      }}
    >
      <Image
        source={{
          uri: data.image,
        }}
        style={styles.image}
      />
      <StyledText>{data.name}</StyledText>
      <Entypo
        name="chevron-right"
        size={24}
        color="#333333"
        style={styles.chev}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  providerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: styleVariables.gap,
    overflow: "hidden",
    paddingRight: 10,
  },
  image: {
    width: 64,
    height: 64,
    marginHorizontal: 8,
  },
  chev: { marginLeft: "auto" },
});
