import { Text, TouchableOpacity } from "react-native";

function SubmitButton({ handleSubmit, title, color, backgroundColor }) {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      className={`rounded-lg justify-center items-center shadow-lg bg-${backgroundColor}`}
      style={{
        // backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Text className={`text-lg font-semibold text-${color}`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;
