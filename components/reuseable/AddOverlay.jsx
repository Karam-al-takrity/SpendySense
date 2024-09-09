import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import FieldInput from "./FieldInput";
import SubmitButton from "./SubmitButton";

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
}) {
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

  const handleCancelModal = () => {
    setShowOverlay(false);
    setItemName("");
    setItemPrice("");
    setIsEditing(false);
    setCurrentItemId(null);
  };

  return (
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
            <Text className="text-center text-red-600 rounded-lg ">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
