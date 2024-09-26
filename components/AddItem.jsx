import { Modal, View, Text, TouchableOpacity } from "react-native";
import FieldInput from "./FieldInput";
import SubmitButton from "./SubmitButton";

export default function AddItem({
  showOverlay,
  setShowOverlay,
  itemName,
  setItemName,
  itemPrice,
  setItemPrice,
  isEditing,
  setIsEditing,
  handleSubmitItem,
  setCurrentItemId,
}) {
  const handleCancelModal = () => {
    setShowOverlay(false);
    setIsEditing(false);
    setItemName("");
    setCurrentItemId(null);
    setItemPrice("");
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
    </View>
  );
}
