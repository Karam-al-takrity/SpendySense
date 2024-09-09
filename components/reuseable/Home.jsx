import { View, Platform } from "react-native";
import FieldInput from "./FieldInput";
import SubmitButton from "./SubmitButton";

export default function home({ initialAmount, setInitialAmount , setRemainingBalance , setShowInput}) {
  const handleSubmit = async () => {
    if (initialAmount !== "" && !isNaN(initialAmount)) {
      setRemainingBalance(parseFloat(initialAmount));
      setShowInput(false);
      // await addMoney(initialAmount);
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number.");
    }
  };
  const handleInputChange = (value) => {
    setInitialAmount(value);
  };

  return (
    <View
      className={`w-full items-center ${Platform.OS === "ios" ? "pb-20" : ""}`}
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
