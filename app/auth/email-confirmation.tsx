import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";

export default function EmailConfirmationPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Confirm Your Email
      </Text>
      <Text style={styles.message}>
        We have sent a confirmation link to your email. Please click the link to
        activate your account.
      </Text>
      <Button
        mode="contained"
        onPress={() => router.push("/auth/login")}
        style={styles.button}
      >
        Go to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
  },
});
