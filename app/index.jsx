import { Redirect } from "expo-router";
import { createBalance, createItem } from "@/backend/db";
import { useEffect } from "react";
import BalanceChecker from "@/components/BalanceChecker";
import { View } from "react-native";

const Home = () => {
  useEffect(() => {
    createBalance();
    createItem();
  }, []);

  // console.log("labosi is " + labosi);
  // let labosi = BalanceChecker() === true ? true : false;

  return (
    <View>
      {/* {labosi === true ? (
        <Redirect href="/(root)/(tabs)/balance" />
      ) : (
        <Redirect href="/(root)/(tabs)/home" />
      )} */}
      <Redirect href="/(root)/(tabs)/balance" />
    </View>
  );
};

export default Home;
