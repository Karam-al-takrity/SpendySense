import { Stack } from "expo-router";
import "react-native-reanimated";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="balance" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
