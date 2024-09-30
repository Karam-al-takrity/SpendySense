import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

function Item({ name, price, date, onDelete, onEdit, formatNumber }) {
  return (
    <View className="bg-white flex flex-row p-4 m-2 rounded-lg shadow  justify-between items-center">
      <View className="flex flex-row  w-[60%] justify-between">
        <View className="flex flex-col max-w-[55%]">
          <Text className="text-lg font-semibold">{name}</Text>
          <Text className="text-md">
            ${formatNumber(parseFloat(price).toFixed(2))}
          </Text>
        </View>
        <Text className="text-xs h-8 mt-2 font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg shadow-sm">
          {date}
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
