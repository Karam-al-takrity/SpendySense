import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SubmitButton from "./SubmitButton";
import { getBalance } from "@/app/db";

export default function RemainingBalance({
  // formatNumber,
  handleItem,
  handleMoney,
  initialAmount,
}) {
  const [balance, setBalance] = useState(0);
  const [displayedBalance, setDisplayedBalance] = useState(0);
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

  useEffect(() => {
    const duration = 1000; // Total animation duration in ms
    const steps = 20; // Number of animation steps
    const stepDuration = duration / steps; // Interval between updates
    const increment = (initialAmount - displayedBalance) / steps; // Step size

    const interval = setInterval(() => {
      setDisplayedBalance((prev) => {
        if (
          (increment > 0 && prev < initialAmount) || // Increasing case
          (increment < 0 && prev > initialAmount) // Decreasing case
        ) {
          return prev + increment;
        } else {
          clearInterval(interval); // Stop the animation when target is reached
          return initialAmount; // Set to exact amount
        }
      });
    }, stepDuration);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [initialAmount]);

  return (
    <View>
      <Text className="text-cobalt fixed text-4xl font-bold text-center mb-2">
        Remaining Balance:
      </Text>
      <Text className="text-cobalt text-4xl font-bold text-center mb-4">
        {/* ${initialAmount === 0 ? "0" : formatNumber(displayedBalance.toFixed(2))} */}
        ${initialAmount === 0 ? "0" : displayedBalance.toFixed(2)}
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
