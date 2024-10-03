import theme from "@/theme";
import { Text, View } from "react-native";
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
        <Text>AutoChronos</Text>
      </View>
    </PaperProvider>
  );
}
