import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  firebaseAuth,
  getStory,
  handleLogout,
  requestPwReset,
} from "../../services/firebase";
import PageWrapper from "../../components/page-wrapper";
import StyledText from "../../components/styled-text";
import StyledButton from "../../components/styled-button";
import { useCallback, useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import StyledInput from "../../components/styled-input";
import { updateProfile } from "firebase/auth";
import styleVariables from "../../constants/styleVariables";

export default function Profile() {
  return (
    <PageWrapper hasTabs>
      <UserCard />

      <Rewards />

      <Actions />
    </PageWrapper>
  );
}

const UserCard = () => {
  const user = useUserStore((state) => state.user);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [progress, setProgress] = useState(false);

  const updateName = async () => {
    setProgress(true);
    updateProfile(firebaseAuth.currentUser, {
      displayName,
    })
      .then(() => null)
      .catch(() => null)
      .finally(() => setProgress(false));
  };

  return (
    <View style={styles.userBlockWrapper}>
      {user.photoURL ? (
        <Image source={{ uri: user.photoURL }} />
      ) : (
        <AntDesign
          name="user"
          size={32}
          color="black"
          style={styles.userAvatarPlaceholder}
        />
      )}

      <View style={styles.userCardDetailsWrapper}>
        <View style={styles.userNameWrapper}>
          <View style={styles.userNameInputWrapper}>
            <StyledInput
              value={displayName}
              setValue={setDisplayName}
              style={styles.nameInput}
            />
          </View>
          {displayName !== user.displayName && (
            <>
              {progress ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity
                  style={styles.userNameButton}
                  onPress={updateName}
                >
                  <StyledText variant={"button"}>Save</StyledText>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <StyledText variant={"metadata"}>{user.email}</StyledText>
      </View>
    </View>
  );
};

const Rewards = () => {
  const router = useRouter();
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: styleVariables.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginVertical: 32,
      }}
    >
      <StyledText center style={{ fontSize: 44 }}>
        22
      </StyledText>
      <StyledText center>points available</StyledText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/about-reward-points")}>
          <StyledText variant={"button"} muted>
            How to?
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/redeem-points")}>
          <StyledText variant={"button"} muted>
            Redeem
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Actions = () => {
  const [progress, setProgress] = useState(false);
  const [message, setMessage] = useState({});

  useFocusEffect(
    useCallback(() => {
      setMessage({});
    }, []),
  );

  const handlePwReset = async () => {
    setProgress(true);
    setMessage({});
    const res = await requestPwReset();
    setProgress(false);
    if (res) {
      setMessage({
        type: "success",
        body: "Please check your inbox to reset the password",
      });
    } else {
      setMessage({
        type: "error",
        body: "Failed to send the password reset email. Please retry.",
      });
    }
  };
  return (
    <View style={styles.actionWrapper}>
      <StyledButton
        title={"Request Password Reset"}
        onPress={handlePwReset}
        progress={progress}
      />
      {message?.type && (
        <StyledText variant={message.type}>{message.body}</StyledText>
      )}

      <TouchableOpacity onPress={handleLogout}>
        <StyledText style={styles.logoutLink}>Logout</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  margin: { marginTop: 10 },
  logoutLink: {
    textDecorationLine: "underline",
    color: "#444",
    marginTop: 40,
  },

  userBlockWrapper: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },

  userCardDetailsWrapper: { marginLeft: 8, flexGrow: 1 },
  nameInput: {
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: -14,
  },
  userNameWrapper: { flexDirection: "row", alignItems: "center" },
  userNameInputWrapper: { flexGrow: 1 },
  userNameButton: { marginLeft: "auto" },
  userAvatarPlaceholder: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 26,
    overflow: "hidden",
  },

  actionWrapper: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 32,
  },
});
