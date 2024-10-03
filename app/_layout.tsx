import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerTitle: "Home" }}>
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
      </Stack>
    </AuthProvider>
  );
}
