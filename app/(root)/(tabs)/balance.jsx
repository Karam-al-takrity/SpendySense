import { useEffect, useState } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Item from "@/components/Item/Item";
import AddItem from "@/components/AddItem";
import AddMoney from "@/components/AddMoney";
import TrashButton from "@/components/TrashButton";
import RemainingBalance from "@/components/RemainingBalance";
import {
  addBalance,
  getBalance,
  getItems,
  setItems,
  deleteItem,
} from "@/backend/db";
import SubmitButton from "@/components/SubmitButton";
import { StatusBar } from "expo-status-bar";

const formatNumber = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const balance = () => {
  const [initialAmount, setInitialAmount] = useState();

  const [remainingBalance, setRemainingBalance] = useState(0);
  const [addedonBalance, setAddedonBalance] = useState();
  const [showOverlay, setShowOverlay] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [showaddMoney, setShowaddMoney] = useState(false);
  const [numberAdded, setNumberAdded] = useState("");
  // const [addedonBalance, setAddedonBalance] = useState(false);

  useEffect(() => {
    GetInitialBalance();
    GetInitialItems();
  }, [addedonBalance]);

  let newBalance = 0;

  const GetInitialBalance = async () => {
    try {
      let balancefromDB = 0;
      let data = await getBalance();
      balancefromDB = data.money;
      setInitialAmount(balancefromDB);
      // setRemainingBalance(balancefromDB);
      // setDisplayedBalance(balancefromDB);
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

      setItems(itemsFromDB);

      console.log("Items fetched successfully:", itemsFromDB);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmitItem = async () => {
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
        await updateItem(currentItemId, itemName, price);

        newBalance = remainingBalance + previousItem.price - price;
        await addBalance(newBalance);
        setRemainingBalance(newBalance);
        setAddedonBalance(true);
        setIsEditing(false);
        setCurrentItemId(null);
      } else {
        setItems([...items, { id: Date.now(), name: itemName, price: price }]);
        addItem(itemName, itemPrice);
        newBalance = remainingBalance - price;
        setRemainingBalance(newBalance);
        await addBalance(newBalance);
      }

      if (itemName != "") {
        setItemName("");
        setItemPrice("");
      }
      setShowOverlay(false);
    } else {
      Alert.alert("Invalid Input", "Please enter a valid item name and price.");
    }
  };

  handleAddBalance = async () => {
    let balancefromDB = 0;
    let data = await getBalance();
    balancefromDB = data.money;
    let money = Number(balancefromDB) + Number(numberAdded);
    setInitialAmount(balancefromDB);
    await addBalance(money);
    setShowaddMoney(false);
    setNumberAdded("");
  };

  const handleItem = () => {
    setShowOverlay(true);
  };

  const handleMoney = () => {
    setShowaddMoney(true);
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
    <SafeAreaView>
      <StatusBar backgroundColor="#334166" style="light" />
      <View className="mt-10">
        <Text className="text-cobalt fixed text-4xl font-bold text-center mb-2">
          Remaining Balance:
        </Text>
        <Text className="text-cobalt text-4xl font-bold text-center mb-4">
          ${initialAmount === 0 ? "0" : formatNumber(initialAmount)}
        </Text>

        <View className="flex-row justify-around">
          <SubmitButton
            handleSubmit={handleItem}
            title={"Add Item"}
            color={"white"}
            backgroundColor={"cobalt"}
          />
          <SubmitButton
            handleSubmit={handleMoney}
            title={"Add Money"}
            color={"white"}
            backgroundColor={"cobalt"}
          />
        </View>
        <AddMoney
          isShow={showaddMoney}
          setShowaddMoney={setShowaddMoney}
          numberAdded={numberAdded}
          setNumberAdded={setNumberAdded}
          handleAddBalance={handleAddBalance}
        />
        <AddItem
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          itemName={itemName}
          setItemName={setItemName}
          itemPrice={itemPrice}
          setItemPrice={setItemPrice}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSubmitItem={handleSubmitItem}
        />
        <ScrollView className="w-full my-10">
          {items.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              price={item.price}
              date={item.date}
              onDelete={() => handleDeleteItem(item.id)}
              onEdit={() => handleEditItem(item.id)}
              // formatNumber={formatNumber}
            />
          ))}
        </ScrollView>
        <View className="flex items-center justify-center flex-col h-[90%]">
          <TrashButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default balance;
