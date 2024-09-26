import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Using AntDesign for the trash can icon
import { DeleteDB } from "@/backend/db";
import * as Updates from "expo-updates";

const TrashButton = () => {
  handleSubmit = async () => {
    await DeleteDB();
    await Updates.reloadAsync();
  };

  return (
    <View className="p-2">
      <TouchableOpacity
        className="bg-gray-200 rounded-full p-4"
        onPress={() => handleSubmit()}
      >
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TrashButton;
