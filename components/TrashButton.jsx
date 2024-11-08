import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const TrashButton = ({ setModalVisible }) => {
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
