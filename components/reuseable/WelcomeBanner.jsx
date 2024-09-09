import { View, Text } from "react-native";

export default function WelcomeBanner() {
  return (
    <View className="flex items-center fixed bg-cobalt justify-center h-1/4">
      <Text className="text-white font-extrabold text-center text-2xl">
        Welcome To SpendySense
      </Text>
    </View>
  );
}
