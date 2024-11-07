import React from "react";
import { Modal, Text, View, Pressable } from "react-native";

const Popup = ({ setModalVisible, modalVisible, handeDelete }) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className="flex-1 items-center justify-center"
          style={{
            backgroundColor: "rgba(51, 65, 102, 0.6)",
            backdropFilter: "blur(5px)",
          }}
        >
          <View className="m-5 items-center rounded-lg bg-white p-8 shadow-lg">
            <Text className="pb-5 text-lg font-bold">Clear Data?</Text>
            <Pressable
              className="mb-2 min-w-[60%] rounded-md bg-cobalt p-2 px-5"
              onPress={() => handeDelete()}
            >
              <Text className="text-center font-bold text-white">Confirm</Text>
            </Pressable>
            <Pressable
              className="min-w-[60%] rounded-md bg-red-500 p-2 px-5"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-center font-bold text-white">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
