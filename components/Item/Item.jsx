import React from "react";
import { Text, View } from "react-native";

function Item({ name, price }) {
  return (
    <View className="item-container">
      <Text className="item-name">{name}</Text>
      <Text className="item-price">${price.toFixed(2)}</Text>
    </View>
  );
}

export default Item;
