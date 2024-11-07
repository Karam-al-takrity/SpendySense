import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

function Item({ name, price, date, onDelete, onEdit, formatNumber }) {
  return (
    <View className="m-2 flex flex-row items-center justify-between rounded-lg bg-white p-4 shadow">
      <View className="flex w-[60%] flex-row justify-between">
        <View className="flex max-w-[55%] flex-col">
          <Text className="text-lg font-semibold">{name}</Text>
          <Text className="text-md">
            ${formatNumber(parseFloat(price).toFixed(2))}
          </Text>
        </View>
        <Text className="mt-2 h-8 rounded-lg bg-gray-200 p-2 text-xs font-semibold text-gray-800 shadow-sm">
          {date}
        </Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={onEdit}
          className="mr-2 rounded-lg bg-blue-500 p-2"
        >
          <Text className="font-bold text-white">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="rounded-lg bg-red-500 p-2"
        >
          <Text className="font-bold text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Item;
