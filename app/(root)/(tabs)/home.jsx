import React, { useState, useEffect } from "react";
import { View, ScrollView, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeBanner from "@/components/WelcomeBanner";
import { StatusBar } from "expo-status-bar";
import FieldInput from "../../../components/FieldInput";
import SubmitButton from "../../../components/SubmitButton";
import { router } from "expo-router";
import { getBalance, addBalance } from "@/backend/db";
import { TouchableOpacity } from "react-native";

export default function Page() {
  const [initialAmount, setInitialAmount] = useState();
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    //database interactions
    // createBalance();
    // createItem();
    getBalance();
  }, [remainingBalance]);

  const handleSubmit = async () => {
    await addBalance(initialAmount);
    if (initialAmount !== undefined && initialAmount !== null)
      router.push("/(root)/(tabs)/balance");
  };

  const handleInputChange = (value) => {
    setInitialAmount(value);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#334166" style="light" />
      <WelcomeBanner />
      <View className="flex-1 justify-center items-center ">
        <View
          className={`w-full items-center ${
            Platform.OS === "ios" ? "pb-20" : ""
          }`}
        >
          <FieldInput
            value={initialAmount}
            onChangeText={handleInputChange}
            keyboardType="numeric"
            placeholder="Enter initial amount"
            placeholderTextColor="#ffffff"
            Style="border-2 w-3/4 h-12 bg-cobalt rounded-lg border-cobalt shadow-md px-4 text-lg text-center text-labosi"
          />
          <View className="mt-4 w-3/4 h-12">
            <TouchableOpacity
              onPress={handleSubmit}
              className="rounded-lg justify-center items-center py-3 px-8 shadow-lg shadow-black bg-white"
            >
              <Text className="text-lg font-semibold text-black">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
