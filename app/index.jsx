import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "@/components/reuseable/Home";
import WelcomeBanner from "@/components/reuseable/WelcomeBanner";
import RemainingBalance from "@/components/reuseable/RemainingBalance";
import AddOverlay from "@/components/reuseable/AddOverlay";
import { StatusBar } from "expo-status-bar";
import Item from "@/components/Item/Item";
// import { addMoney, getBalance } from "@/app/db";
const formatNumber = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// const Item = ({ name, price, onDelete, onEdit }) => (
//   <View className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center">
//     <View>
//       <Text className="text-lg font-semibold">{name}</Text>
//       <Text className="text-md">
//         ${formatNumber(parseFloat(price).toFixed(2))}
//       </Text>
//     </View>
//     <View className="flex-row">
//       <TouchableOpacity
//         onPress={onEdit}
//         className="bg-blue-500 p-2 rounded-lg mr-2"
//       >
//         <Text className="text-white font-bold">Edit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={onDelete}
//         className="bg-red-500 p-2 rounded-lg"
//       >
//         <Text className="text-white font-bold">Delete</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

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

  const CounterAnimation = () => {
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
  };

  useEffect(() => {
    // getAllBalance();
    CounterAnimation();
  }, [remainingBalance]);

  const handleItem = () => {
    setShowOverlay(true);
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

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#334166" style="light" />
      {showInput ? <WelcomeBanner /> : null}

      <View className="flex-1 justify-center items-center ">
        {showInput ? (
          <Home
            // handleSubmit={handleSubmit}
            initialAmount={initialAmount}
            setInitialAmount={setInitialAmount}
            setRemainingBalance={setRemainingBalance}
            setShowInput={setShowInput}
          />
        ) : (
          <View className="w-full items-center fixed top-10 h-full ">
            <RemainingBalance
              formatNumber={formatNumber}
              displayedBalance={displayedBalance}
              handleItem={handleItem}
            />
            <ScrollView className="w-full my-10">
              {items.map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  onDelete={() => handleDeleteItem(item.id)}
                  onEdit={() => handleEditItem(item.id)}
                  formatNumber={() => formatNumber()}
                />
              ))}
            </ScrollView>
          </View>
        )}
        <AddOverlay
          setShowOverlay={setShowOverlay}
          showOverlay={showOverlay}
          itemName={itemName}
          setItemName={setItemName}
          itemPrice={itemPrice}
          setItemPrice={setItemPrice}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          remainingBalance={remainingBalance}
          setItems={setItems}
          items={items}
          setRemainingBalance={setRemainingBalance}
          currentItemId={currentItemId}
          setCurrentItemId={setCurrentItemId}
        />
      </View>
    </SafeAreaView>
  );
}
