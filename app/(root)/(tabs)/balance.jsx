import { useEffect, useState } from "react";
import { View, Alert, FlatList } from "react-native";
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
  addItem,
  updateItem,
  deleteItem,
  DeleteDB,
} from "@/backend/db";
import { StatusBar } from "expo-status-bar";
import Popup from "../../../components/Popup";
import * as Updates from "expo-updates";
const formatNumber = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const balance = () => {
  const [initialAmount, setInitialAmount] = useState("");
  const [moneyAdded, setMoneyAdded] = useState(false);

  const [remainingBalance, setRemainingBalance] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [showaddMoney, setShowaddMoney] = useState(false);
  const [numberAdded, setNumberAdded] = useState("");
  const [modalVisible, setModalVisible] = useState(Boolean);

  const MoneyAdded = () => {
    setMoneyAdded(false);
  };

  useEffect(() => {
    GetBalance();
    GetItems();
    MoneyAdded();
  }, [moneyAdded]);

  let newBalance = 0;

  const GetBalance = async () => {
    try {
      let balancefromDB = 0;
      let data = await getBalance();
      balancefromDB = data.money;
      setInitialAmount(balancefromDB);
      console.log("Balance Fetched");
    } catch (error) {
      console.log("Error: fetching balance");
    }
  };

  const GetItems = async () => {
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

  const handleDelete = async () => {
    setModalVisible(false);
    await DeleteDB();
    await Updates.reloadAsync();
  };

  const handleSubmitItem = async () => {
    if (itemName && itemPrice && !isNaN(itemPrice)) {
      const price = parseFloat(itemPrice);
      if (price > initialAmount && !isEditing) {
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

        newBalance = initialAmount + previousItem.price - price;
        await addBalance(newBalance);
        await GetBalance();
        setRemainingBalance(newBalance);
        setIsEditing(false);
        setCurrentItemId(null);
      } else {
        setItems([...items, { id: Date.now(), name: itemName, price: price }]);
        await addItem(itemName, itemPrice);
        newBalance = initialAmount - price;
        setInitialAmount(newBalance);
        await GetItems();
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
    await addBalance(money);
    setInitialAmount(balancefromDB);
    setMoneyAdded(true);
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
    newBalance = initialAmount + deletedItem.price;
    setInitialAmount(newBalance);
    await addBalance(newBalance);
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#334166" style="light" />
      <View className="relative h-screen py-10">
        <RemainingBalance
          initialAmount={initialAmount}
          setInitialAmount={setInitialAmount}
          handleItem={handleItem}
          handleMoney={handleMoney}
        />

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
          setCurrentItemId={setCurrentItemId}
        />

        <FlatList
          className="mt-10 max-h-[62%] w-full"
          renderItem={({ item }) => (
            <Item
              key={item.id}
              name={item.name}
              price={item.price}
              date={item.date}
              onDelete={() => handleDeleteItem(item.id)}
              onEdit={() => handleEditItem(item.id)}
              formatNumber={formatNumber}
            />
          )}
          data={items}
        />
        <View className="absolute bottom-0 mt-2 flex w-full items-center justify-center">
          <TrashButton setModalVisible={setModalVisible} />
        </View>
        {modalVisible && (
          <Popup
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            handleDelete={handleDelete}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default balance;
