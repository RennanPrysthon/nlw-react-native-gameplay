import React, { ReactNode } from "react";

import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { ViewProps } from "react-native";

import { theme } from "../../global/styles/theme";
import { styles } from "./style";

type Props = ViewProps & {
  children: ReactNode;
};

export const Background: React.FC<Props> = ({ children, ...rest }) => {
  const { secondary80, secondary100 } = theme.colors;
  return (
    <LinearGradient
      style={styles.container}
      {...rest}
      colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  );
};
