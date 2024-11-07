import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { getBalance, createBalance, createItem } from "@/backend/db";

const Home = () => {
  const [hasBalance, setHasBalance] = useState(null); // `null` initially, to represent loading state

  useEffect(() => {
    const checkBalance = async () => {
      try {
        await createBalance();
        await createItem();

        const balanceData = await getBalance();
        setHasBalance(balanceData !== undefined && balanceData !== null);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    checkBalance();
  }, []);

  if (hasBalance === null) {
    // Optionally, render a loading indicator here while checking balance
    return <View />;
  }

  return (
    <View>
      {hasBalance ? (
        <Redirect href="/(root)/(tabs)/balance" />
      ) : (
        <Redirect href="/(root)/(tabs)/home" />
      )}
    </View>
  );
};

export default Home;
