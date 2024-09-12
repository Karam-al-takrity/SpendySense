import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SubmitButton from "./SubmitButton";
import { getBalance } from "@/app/db";

export default function RemainingBalance({
  formatNumber,
  handleItem,
  handleMoney,
  initialAmount,
}) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const balanceData = await getBalance();
        const balanceFromDb = balanceData.money;
        setBalance(balanceFromDb);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
    fetchBalance();
  }, []);

  return (
    <View>
      <Text className="text-cobalt fixed text-4xl font-bold text-center mb-2">
        Remaining Balance:
      </Text>
      <Text className="text-cobalt text-4xl font-bold text-center mb-4">
        ${initialAmount === 0 ? "0" : formatNumber(initialAmount)}
      </Text>

      <View className="flex-row justify-around">
        <SubmitButton
          handleSubmit={handleItem}
          title={"Add Item"}
          color={"white"}
          backgroundColor={"cobalt"}
        />
        <SubmitButton
          handleSubmit={handleMoney}
          title={"Add Money"}
          color={"white"}
          backgroundColor={"cobalt"}
        />
      </View>
    </View>
  );
}
