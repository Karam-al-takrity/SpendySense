import { View, Text } from "react-native";
import SubmitButton from "./SubmitButton";
export default function RemainingBalance({
  formatNumber,
  displayedBalance,
  handleItem,
}) {
  return (
    <View>
      <Text className="text-cobalt fixed text-4xl font-bold text-center mb-2">
        Remaining Balance:
      </Text>
      <Text className="text-cobalt text-4xl font-bold text-center mb-4">
        ${formatNumber(displayedBalance.toFixed(2))}
        {/* {initialAmount.balance} */}
      </Text>
      <View>
        <SubmitButton
          handleSubmit={handleItem}
          title={"Add Item"}
          color={"white"}
          backgroundColor={"cobalt"}
        />
      </View>
    </View>
  );
}
