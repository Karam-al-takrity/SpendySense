import { getBalance } from "@/backend/db";
import { useEffect } from "react";

const BalanceChecker = () => {
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await getBalance();

        if (balanceData !== undefined || balanceData !== null) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return BalanceChecker;
};

export default BalanceChecker;
