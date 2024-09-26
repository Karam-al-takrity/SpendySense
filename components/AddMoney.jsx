import { Modal, View, Text, TouchableOpacity } from "react-native";
import FieldInput from "./FieldInput";
import SubmitButton from "./SubmitButton";

export default function AddMoney({
  isShow,
  setShowaddMoney,
  numberAdded,
  setNumberAdded,
  handleAddBalance,
}) {
  const handleCancelAdd = () => {
    setShowaddMoney(false);
    setNumberAdded("");
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShow}
        onRequestClose={() => setShowaddMoney(false)}
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
              onPress={() => handleCancelAdd()}
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
