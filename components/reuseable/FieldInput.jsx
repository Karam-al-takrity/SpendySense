import { TextInput } from "react-native";

function FieldInput({
  value,
  onChangeText,
  keyboardType,
  placeholder,
  placeholderTextColor,
  Style,
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      className={Style}
    />
  );
}

export default FieldInput;
