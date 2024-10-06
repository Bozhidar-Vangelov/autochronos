import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SignUpData } from "./types";
import api from "@/services/api";
import { useRouter } from "expo-router";
import { Button, Text, TextInput } from "react-native-paper";

export default function SignUpPage() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if (
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.confirmPassword
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", signUpData);
      alert(
        "Registration successful! Please check your email to confirm your account."
      );
      router.push("/auth/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Sign Up
      </Text>
      <TextInput
        label="Email"
        value={signUpData.email}
        onChangeText={(text) => setSignUpData({ ...signUpData, email: text })}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={signUpData.password}
        onChangeText={(text) =>
          setSignUpData({ ...signUpData, password: text })
        }
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={signUpData.confirmPassword}
        onChangeText={(text) =>
          setSignUpData({ ...signUpData, confirmPassword: text })
        }
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/auth/login")}
        style={styles.loginButton}
      >
        Already have an account? Log In
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
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    marginBottom: 15,
  },
  loginButton: {
    alignSelf: "center",
  },
});
