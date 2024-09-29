import { Redirect } from "expo-router";
import BalanceChecker from "@/components/BalanceChecker";

const Home = () => {
  const balanceChecker = new BalanceChecker();
  if (balanceChecker) return <Redirect href="/(root)/(tabs)/balance" />;
  return <Redirect href="/(root)/(tabs)/home" />;
};

export default Home;
