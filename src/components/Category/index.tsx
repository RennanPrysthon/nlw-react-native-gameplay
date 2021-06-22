import React from "react";
import { View, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./style";
import { theme } from "../../global/styles/theme";

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckBox?: boolean;
  checked?: boolean;
};

const Category: React.FC<Props> = ({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}) => {
  const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;
  return (
    <RectButton {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <LinearGradient
          style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[checked ? secondary85 : secondary40, secondary40]}
        >
          {hasCheckBox && (
            <View
              style={[
                checked ? styles.checked : styles.check,
                styles.checkedBox,
              ]}
            />
          )}
          <Icon width={48} height={48} />
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
};

export default Category;
