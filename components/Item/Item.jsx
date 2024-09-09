import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

function Item({ name, price, onDelete, onEdit, formatNumber }) {
  return (
    <View className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-semibold">{name}</Text>
        <Text className="text-md">
          ${formatNumber(parseFloat(price).toFixed(2))}
        </Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={onEdit}
          className="bg-blue-500 p-2 rounded-lg mr-2"
        >
          <Text className="text-white font-bold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="bg-red-500 p-2 rounded-lg"
        >
          <Text className="text-white font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Item;
