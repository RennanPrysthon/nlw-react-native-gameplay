import React from "react";
import { TextInput, TextInputProps } from "react-native";

import { styles } from "./style";

export const SmallInput: React.FC<TextInputProps> = ({ ...rest }) => {
  return (
    <TextInput style={styles.container} {...rest} keyboardType="numeric" />
  );
};
