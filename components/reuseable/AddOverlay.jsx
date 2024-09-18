import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import FieldInput from "./FieldInput";
import SubmitButton from "./SubmitButton";
import { addBalance, addItem, getBalance, updateItem } from "@/app/db";

export default function AddOverlay({
  showOverlay,
  setShowOverlay,
  itemName,
  setItemName,
  itemPrice,
  setItemPrice,
  isEditing,
  setIsEditing,
  remainingBalance,
  setItems,
  items,
  setRemainingBalance,
  currentItemId,
  setCurrentItemId,
  showAdd,
  setShowAdd,
  numberAdded,
  setNumberAdded,
  setAddedonBalance,
}) {
  let newBalance = 0;
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
        setRemainingBalance(newBalance);
        await addBalance(newBalance);
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

  const handleCancelModal = () => {
    setShowOverlay(false);
    setIsEditing(false);
    setCurrentItemId(null);
    setItemName("");
    setItemPrice("");
  };

  const handleAddBalance = async () => {
    let balancefromDB = 0;
    let data = await getBalance();
    balancefromDB = data.money;
    let money = Number(balancefromDB) + Number(numberAdded);
    await addBalance(money);
    setAddedonBalance(true);
    setNumberAdded("");
    setShowAdd(false);
  };

  const handleCancelBalance = () => {
    setShowAdd(false);
    setNumberAdded("");
  };

  return (
    <View>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAdd}
        onRequestClose={() => setShowAdd(false)}
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
              value={numberAdded}
              onChangeText={setNumberAdded}
              placeholder="labosi"
              keyboardType="numeric"
              Style="border-2 border-gray-300 rounded-lg p-2 mb-4 focus:border-black"
            />
            <SubmitButton
              handleSubmit={handleAddBalance}
              title="Add"
              backgroundColor={"cobalt"}
              color="white"
            />
            <TouchableOpacity
              onPress={() => handleCancelBalance()}
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
  );
}
