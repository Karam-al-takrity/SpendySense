import { getBalance } from "@/backend/db";
import { createBalance, createItem } from "@/backend/db";
import { useEffect } from "react";

const BalanceChecker = () => {
  let labosi = false;
  useEffect(() => {
    createBalance();
    createItem();
    const fetchBalance = async () => {
      try {
        const balanceData = await getBalance();

        if (balanceData === undefined || balanceData === null) {
          labosi = false;
        } else {
          labosi = true;
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return labosi;
};

export default BalanceChecker;
