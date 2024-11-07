import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DeleteDB } from "@/backend/db";
import * as Updates from "expo-updates";

const TrashButton = ({ setModalVisible }) => {
  handleSubmit = async () => {
    await DeleteDB();
    await Updates.reloadAsync();
  };

  return (
    <View className="p-2">
      <TouchableOpacity
        className="rounded-full bg-gray-200 p-4"
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TrashButton;
