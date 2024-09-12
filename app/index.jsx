import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "@/components/reuseable/Home";
import WelcomeBanner from "@/components/reuseable/WelcomeBanner";
import RemainingBalance from "@/components/reuseable/RemainingBalance";
import AddOverlay from "@/components/reuseable/AddOverlay";
import { StatusBar } from "expo-status-bar";
import Item from "@/components/Item/Item";
import {
  createItem,
  createBalance,
  addBalance,
  getBalance,
  getItems,
  updateUser,
  deleteUser,
  DeleteDB,
  deleteItem,
} from "@/app/db";
const formatNumber = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Page() {
  const [initialAmount, setInitialAmount] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [displayedBalance, setDisplayedBalance] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [numberAdded, setNumberAdded] = useState("");
  const [addedonBalance, setAddedonBalance] = useState(false);

  const GetInitialBalance = async () => {
    try {
      let balancefromDB = 0;
      let data = await getBalance();
      balancefromDB = data.money;
      setInitialAmount(balancefromDB);
      setRemainingBalance(balancefromDB);
      setDisplayedBalance(balancefromDB);
      console.log("Balance Fetched");
    } catch (error) {
      console.log("Error: fetching balance");
    }
  };

  const GetInitialItems = async () => {
    try {
      let itemsFromDB = [];
      let data = await getItems();
      itemsFromDB = data;

      // Assuming you have these state setters defined in your component
      setItems(itemsFromDB);

      console.log("Items fetched successfully:", itemsFromDB);
    } catch (error) {
      console.error("Error fetching items:", error);
      // Optionally, you can set an error state here
      // setError("Failed to fetch items");
    }
  };

  handleAddBalance = async () => {
    let balancefromDB = 0;
    let data = await getBalance();
    balancefromDB = data.money;
    let money = Number(balancefromDB) + Number(numberAdded);
    await addBalance(money);
    setShowAdd(false);
  };

  const CounterAnimation = () => {
    let start = displayedBalance;
    const end = remainingBalance;
    if (start === end) return;

    const duration = 10; // Total duration of the animation in milliseconds
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

      // setDisplayedBalance(start);
      setInitialAmount(start);

      if (start === end) {
        clearInterval(timer); // Stop the interval when we reach the end
      }
    }, stepTime);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    //database interactions
    createItem();
    createBalance();
    GetInitialBalance();
    getBalance();
    GetInitialItems();
    // getItems();
    // DeleteDB();

    //
    CounterAnimation();
    setAddedonBalance(false);
    console.log("this got hit");
  }, [remainingBalance, addedonBalance]);

  const handleItem = () => {
    setShowOverlay(true);
  };
  const handleMoney = () => {
    setShowAdd(true);
  };

  const handleEditItem = async (id) => {
    const item = items.find((item) => item.id === id);
    setItemName(item.name);
    const price = item.price.toString();
    setItemPrice(price);
    setIsEditing(true);
    setCurrentItemId(id);
    setShowOverlay(true);
  };

  const handleDeleteItem = async (id) => {
    let newBalance = 0;
    const deletedItem = items.find((item) => item.id === id);
    await deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
    newBalance = remainingBalance + deletedItem.price;
    setRemainingBalance(newBalance);
    await addBalance(newBalance);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#334166" style="light" />
      {initialAmount === null ||
      initialAmount === undefined ||
      initialAmount === "" ? (
        <WelcomeBanner />
      ) : null}

      <View className="flex-1 justify-center items-center ">
        {initialAmount === null ||
        initialAmount === undefined ||
        initialAmount === "" ? (
          <Home
            initialAmount={initialAmount}
            setInitialAmount={setInitialAmount}
            setRemainingBalance={setRemainingBalance}
          />
        ) : (
          <View className="w-full items-center fixed top-10 h-full ">
            <RemainingBalance
              formatNumber={formatNumber}
              displayedBalance={displayedBalance}
              handleItem={handleItem}
              initialAmount={initialAmount}
              handleMoney={handleMoney}
            />
            <ScrollView className="w-full my-10">
              {items.map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  onDelete={() => handleDeleteItem(item.id)}
                  onEdit={() => handleEditItem(item.id)}
                  formatNumber={formatNumber}
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
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          numberAdded={numberAdded}
          setNumberAdded={setNumberAdded}
          GetInitialBalance={GetInitialBalance}
          setAddedonBalance={setAddedonBalance}
        />
      </View>
    </SafeAreaView>
  );
}
