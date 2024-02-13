import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import PageWrapper from "../components/page-wrapper";
import StyledText from "../components/styled-text";
import { MaterialIcons } from "@expo/vector-icons";
import styleVariables from "../constants/styleVariables";
import { redeemPoints } from "../services/firebase";
import useUserStore from "../stores/useUserStore";
import { useState } from "react";
import { pointsPerStory, valuePerPoint } from "../constants/rewardPoints";

export default function RedeemPoints() {
  const params = useLocalSearchParams();

  const data = JSON.parse(params.data);

  return (
    <PageWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Redeem Points",
        }}
      />

      <StyledText />

      <View style={styles.provider}>
        <Image source={{ uri: data.image }} style={styles.image} />

        <StyledText variant={"title"} center>
          Available Vouchers from {data.name}
        </StyledText>
      </View>

      <StyledText />
      <StyledText />

      {data?.items?.map((item, idx) => (
        <Item key={idx} item={item} provider={data.name} />
      ))}
    </PageWrapper>
  );
}

const Item = ({ item, provider }) => {
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(false);

  const setMyRedeems = useUserStore((state) => state.setMyRedeems);

  const myStories = useUserStore((state) => state.myStories);
  const myRedeems = useUserStore((state) => state.myRedeems);

  const redeemed = myRedeems.reduce((total, curr) => total + curr.points, 0);

  const pointsAvailable = Math.max(
    myStories?.length * pointsPerStory - redeemed,
    0,
  );

  const handleRedeem = async () => {
    if (pointsAvailable < item.points) {
      const storiesPending = (item.points - pointsAvailable) / pointsPerStory;

      Alert.alert(
        `Need more points`,
        `You need ${Math.round(storiesPending)} more ${
          storiesPending === 1 ? "story" : "stories"
        } to redeem this voucher from ${provider}`,
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
      );
      return;
    }
    Alert.alert(
      `You are about to redeem ${item.points} points from ${provider}`,
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {
            setProgress(true);
            redeemPoints({
              ...item,
              provider,
              value: Math.round(item.points / valuePerPoint),
            })
              .then((res) => {
                setMyRedeems(res);
                setSuccess(true);
              })
              .finally(() => setProgress(false));
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity onPress={handleRedeem} style={styles.wrapper}>
      <MaterialIcons name="card-giftcard" size={24} color="black" />
      <StyledText style={styles.text}>
        E-voucher of Rs. {item.points / valuePerPoint}
      </StyledText>

      {success ? (
        <MaterialIcons
          name="check"
          size={24}
          color={styleVariables.colors.primary}
        />
      ) : progress ? (
        <ActivityIndicator />
      ) : (
        <StyledText>{item.points} Points</StyledText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: styleVariables.gap,
    overflow: "hidden",
    padding: 16,
  },
  image: {
    width: 64,
    height: 64,
  },
  text: { marginLeft: 8, marginRight: "auto" },
  provider: { alignItems: "center" },
});
