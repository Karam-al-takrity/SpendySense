import { Text, TouchableOpacity } from "react-native";

function SubmitButton({ handleSubmit, title, color, backgroundColor }) {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      className={`rounded-lg justify-center items-center py-3 px-8 shadow-lg shadow-black bg-${backgroundColor}`}
    >
      <Text className={`text-lg font-semibold text-${color}`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;
