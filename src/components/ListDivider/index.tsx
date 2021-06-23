import React from "react";
import { View } from "react-native";

import { styles } from "./style";

type Props = {
  isCentered?: boolean;
};

export const ListDivider: React.FC<Props> = ({ isCentered }: Props) => {
  return (
    <View
      style={[
        styles.container,
        isCentered
          ? {
              marginVertical: 12,
            }
          : {
              marginTop: 2,
              marginBottom: 31,
            },
      ]}
    />
  );
};
