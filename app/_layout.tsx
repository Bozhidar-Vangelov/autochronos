import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import theme from "@/theme";
import { Slot, Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
    setLoading(false);
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Slot />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="auth/login"
            options={{
              headerTitle: "Login",
            }}
          />
          <Stack.Screen
            name="auth/signup"
            options={{
              headerTitle: "SignUp",
            }}
          />
          <Stack.Screen
            name="auth/email-confirmation"
            options={{
              headerTitle: "Email Confirmation",
            }}
          />
          <Stack.Screen
            name="cars/index"
            options={{
              headerTitle: "Cars",
            }}
          />
          <Stack.Screen
            name="cars/maintenance"
            options={{
              headerTitle: "Maintenance",
            }}
          />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}
