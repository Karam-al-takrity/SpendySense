import React from "react";
import { Modal, Text, View, Pressable } from "react-native";

const Popup = ({
  setModalVisible,
  modalVisible,
  handleDelete,
  question,
  option1,
  option2,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          className="flex-1 items-center justify-center"
          // style={{
          //   backgroundColor: "rgba(51, 65, 102, 0.6)",
          //   backdropFilter: "blur(5px)",
          // }}
        >
          <View className="m-5 items-center rounded-lg bg-white p-8 shadow-lg">
            <Text className="pb-5 text-lg font-bold">{question}</Text>
            <Pressable
              className="mb-2 min-w-[60%] rounded-md bg-cobalt p-2 px-5"
              onPress={() => handleDelete()}
            >
              <Text className="text-center font-bold text-white">
                {option1}
              </Text>
            </Pressable>
            <Pressable
              className="min-w-[60%] rounded-md bg-red-500 p-2 px-5"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-center font-bold text-white">
                {option2}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
