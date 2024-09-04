import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../components/reuseable/SubmitButton";
import FieldInput from "../components/reuseable/FieldInput";
import { StatusBar } from "expo-status-bar";

const formatNumber = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Item = ({ name, price, onDelete, onEdit }) => (
  <View className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center">
    <View>
      <Text className="text-lg font-semibold">{name}</Text>
      <Text className="text-md">
        ${formatNumber(parseFloat(price).toFixed(2))}
      </Text>
    </View>
    <View className="flex-row">
      <TouchableOpacity
        onPress={onEdit}
        className="bg-blue-500 p-2 rounded-lg mr-2"
      >
        <Text className="text-white font-bold">Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onDelete}
        className="bg-red-500 p-2 rounded-lg"
      >
        <Text className="text-white font-bold">Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Page() {
  const [initialAmount, setInitialAmount] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [displayedBalance, setDisplayedBalance] = useState(0);
  const [showInput, setShowInput] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  useEffect(() => {
    let start = displayedBalance;
    const end = remainingBalance;
    if (start === end) return;

    const duration = 1000; // Total duration of the animation in milliseconds
    const range = Math.abs(end - start); // Total amount to count
    const increment = Math.ceil(range / 100); // Increment value
    const stepTime = Math.abs(Math.floor(duration / 100)); // Duration per step

    const timer = setInterval(() => {
      if (start < end) {
        start += increment; // Increment if start is less than end
        if (start >= end) start = end; // Ensure we don't overshoot
      } else {
        start -= increment; // Decrement if start is greater than end
        if (start <= end) start = end; // Ensure we don't undershoot
      }

      setDisplayedBalance(start);

      if (start === end) {
        clearInterval(timer); // Stop the interval when we reach the end
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [remainingBalance]);

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
      if (price > remainingBalance && !isEditing) {
        Alert.alert(
          "Insufficient Balance",
          "The item price exceeds your remaining balance."
        );
        return;
      }

      if (isEditing) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === currentItemId
              ? { ...item, name: itemName, price: price }
              : item
          )
        );
        const previousItem = items.find((item) => item.id === currentItemId);
        setRemainingBalance(
          (prevBalance) => prevBalance + previousItem.price - price
        );
        setIsEditing(false);
        setCurrentItemId(null);
      } else {
        setItems([...items, { id: Date.now(), name: itemName, price: price }]);
        setRemainingBalance((prevBalance) => prevBalance - price);
      }

      setItemName("");
      setItemPrice("");
      setShowOverlay(false);
    } else {
      Alert.alert("Invalid Input", "Please enter a valid item name and price.");
    }
  };

  const handleEditItem = (id) => {
    const item = items.find((item) => item.id === id);
    setItemName(item.name);
    setItemPrice(item.price.toString());
    setIsEditing(true);
    setCurrentItemId(id);
    setShowOverlay(true);
  };

  const handleDeleteItem = (id) => {
    const deletedItem = items.find((item) => item.id === id);
    setItems(items.filter((item) => item.id !== id));
    setRemainingBalance((prevBalance) => prevBalance + deletedItem.price);
  };

  const handleCancelModal = () => {
    setShowOverlay(false);
    setItemName("");
    setItemPrice("");
    setIsEditing(false);
    setCurrentItemId(null);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#334166" style="light" />
      {showInput ? (
        <View className="flex items-center fixed bg-cobalt justify-center h-1/4">
          <Text className="text-white font-extrabold text-center text-2xl">
            Welcome To SpendySense
          </Text>
        </View>
      ) : null}

      <View className="flex-1 justify-center items-center ">
        {showInput ? (
          <View
            className={`w-full items-center ${
              Platform.OS === "ios" ? "pb-20" : ""
            }`}
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
        ) : (
          <View className="w-full items-center fixed top-10 h-full ">
            <View>
              <Text className="text-cobalt fixed text-4xl font-bold text-center mb-2">
                Remaining Balance:
              </Text>
              <Text className="text-cobalt text-4xl font-bold text-center mb-4">
                ${formatNumber(displayedBalance.toFixed(2))}
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
                  onEdit={() => handleEditItem(item.id)}
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
            className="flex-1 justify-center  items-center"
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
                Style="border-2 border-gray-300 rounded-lg focus:border-black transition-1 p-2 mb-4"
              />
              <FieldInput
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholder="Item Price"
                keyboardType="numeric"
                Style="border-2 border-gray-300 rounded-lg p-2 mb-4 focus:border-black"
              />
              <SubmitButton
                handleSubmit={handleSubmitItem}
                title={isEditing ? "Update" : "Add"}
                backgroundColor={"cobalt"}
                color="white"
              />
              <TouchableOpacity
                onPress={() => handleCancelModal()}
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
