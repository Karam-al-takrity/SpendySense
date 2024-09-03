import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../components/reuseable/SubmitButton";
import FieldInput from "../components/reuseable/FieldInput";

const formatNumber = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Item = ({ name, price, onDelete }) => (
  <View className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center">
    <View>
      <Text className="text-lg font-semibold">{name}</Text>
      <Text className="text-md">
        ${formatNumber(parseFloat(price).toFixed(2))}
      </Text>
    </View>
    <TouchableOpacity onPress={onDelete} className="bg-red-500 p-2 rounded-lg">
      <Text className="text-white font-bold">Delete</Text>
    </TouchableOpacity>
  </View>
);

export default function Page() {
  const [initialAmount, setInitialAmount] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [showInput, setShowInput] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (value) => {
    setInitialAmount(value);
  };

  const handleSubmit = () => {
    if (initialAmount !== "" && !isNaN(initialAmount)) {
      setRemainingBalance(parseFloat(initialAmount));
      setShowInput(false);
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number.");
    }
  };

  const handleItem = () => {
    setShowOverlay(true);
  };

  const handleSubmitItem = () => {
    if (itemName && itemPrice && !isNaN(itemPrice)) {
      const price = parseFloat(itemPrice);
      if (price > remainingBalance) {
        Alert.alert(
          "Insufficient Balance",
          "The item price exceeds your remaining balance."
        );
        return;
      }
      setItems([...items, { id: Date.now(), name: itemName, price: price }]);
      setRemainingBalance((prevBalance) => prevBalance - price);
      setItemName("");
      setItemPrice("");
      setShowOverlay(false);
    } else {
      Alert.alert("Invalid Input", "Please enter a valid item name and price.");
    }
  };

  const handleDeleteItem = (id) => {
    const deletedItem = items.find((item) => item.id === id);
    setItems(items.filter((item) => item.id !== id));
    setRemainingBalance((prevBalance) => prevBalance + deletedItem.price);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {showInput ? (
        <View className="flex items-center fixed bg-cobalt justify-center  h-1/4">
          <Text className="text-white font-extrabold text-center text-2xl">
            Welcome To SpendySense
          </Text>
        </View>
      ) : (
        ""
      )}
      <StatusBar backgroundColor="#334166" />
      <View className="flex-1 justify-center items-center">
        {showInput ? (
          <View className="w-full items-center ">
            <FieldInput
              value={initialAmount}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              placeholder="Enter initial amount"
              placeholderTextColor="#ffffff"
              Style="border-2 w-3/4 h-12 bg-cobalt rounded-lg border-cobalt shadow-md px-4 text-lg text-center text-passive"
            />
            <View className="mt-4 w-3/4 h-12 ">
              <SubmitButton
                handleSubmit={handleSubmit}
                title={"Submit"}
                backgroundColor={"white"}
                color={"black"}
              />
            </View>
          </View>
        ) : (
          <View className="w-full items-center  fixed top-10 h-full ">
            <View>
              <Text className="text-cobalt  fixed text-4xl font-bold text-center mb-2">
                Remaining Balance:
              </Text>
              <Text className="text-cobalt text-4xl font-bold text-center mb-4">
                ${formatNumber(remainingBalance.toFixed(2))}
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
            <ScrollView className="w-full my-10">
              {items.map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={showOverlay}
          onRequestClose={() => setShowOverlay(false)}
        >
          <View
            className="flex-1 justify-center items-center"
            style={{
              backgroundColor: "rgba(51, 65, 102, 0.6)",
              backdropFilter: "blur(5px)",
            }}
          >
            <View className="bg-white p-6 rounded-lg w-4/5 shadow-lg">
              <FieldInput
                value={itemName}
                onChangeText={setItemName}
                placeholder="Item Name"
                Style="border-2 border-gray-300 rounded-lg p-2 mb-4"
              />
              <FieldInput
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholder="Item Price"
                keyboardType="numeric"
                Style="border-2 border-gray-300 rounded-lg p-2 mb-4"
              />
              <SubmitButton
                handleSubmit={handleSubmitItem}
                title="Add"
                backgroundColor={"cobalt"}
                color="white"
              />
              <TouchableOpacity
                onPress={() => setShowOverlay(false)}
                className="mt-4"
              >
                <Text className="text-center text-red-600 rounded-lg ">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}