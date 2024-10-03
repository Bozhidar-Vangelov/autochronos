import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="cars/index" />
      <Stack.Screen name="cars/maintenance" />
    </Stack>
  );
}
