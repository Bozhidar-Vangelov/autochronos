import { StyleSheet, View } from "react-native";
import { LoginData } from "./types";
import { useContext, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { AuthContext } from "@/contexts/AuthContext";
import api from "@/services/api";

export default function LoginPage() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });
      if (response.data.token) {
        login(response.data.token);
        router.replace("/cars");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: keyof LoginData, text: string) => {
    setLoginData({ ...loginData, [name]: text });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Log In
      </Text>
      <TextInput
        label="Email"
        value={loginData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={loginData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Log In
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push("/auth/signup")}
        style={styles.signupButton}
      >
        Don't have an account? Sign Up
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
    borderRadius: 20,
  },
  signupButton: {
    alignSelf: "center",
  },
});
