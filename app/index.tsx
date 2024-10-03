import theme from "@/theme";
import { Link } from "expo-router";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/signup">Signup</Link>
      </View>
    </PaperProvider>
  );
}
