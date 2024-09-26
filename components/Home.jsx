import React, { useState } from "react";
import { View, Platform, Alert } from "react-native";
import FieldInput from "./FieldInput";
import SubmitButton from "./SubmitButton";
import { addBalance } from "@/backend/db";

export default function Home() {
  const [inputValue, setInputValue] = useState(initialAmount.toString());

  const handleSubmit = async () => {
    if (inputValue !== "" && !isNaN(inputValue)) {
      const numericValue = parseFloat(inputValue);
      await addBalance(numericValue);
      setInitialAmount(numericValue);
      setRemainingBalance(numericValue);
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number.");
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <View
      className={`w-full items-center ${Platform.OS === "ios" ? "pb-20" : ""}`}
    >
      <FieldInput
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder="Enter initial amount"
        placeholderTextColor="#ffffff"
        Style="border-2 w-3/4 h-12 bg-cobalt rounded-lg border-cobalt shadow-md px-4 text-lg text-center text-labosi"
      />
      <View className="mt-4 w-3/4 h-12">
        <SubmitButton
          handleSubmit={handleSubmit}
          title={"Submit"}
          backgroundColor={"white"}
          color={"black"}
        />
      </View>
    </View>
  );
}
