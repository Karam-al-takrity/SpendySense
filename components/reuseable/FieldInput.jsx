import { useState } from "react";
import { TextInput } from "react-native";

function FieldInput({
  value,
  onChangeText,
  keyboardType,
  placeholder,
  placeholderTextColor,
  Style,
}) {
  const [plahceHolder, setPlaceHolder] = useState(placeholder);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={plahceHolder}
      placeholderTextColor={placeholderTextColor}
      className={Style}
      onFocus={() => setPlaceHolder("")}
      onBlur={() => setPlaceHolder(placeholder)}
    />
  );
}

export default FieldInput;
