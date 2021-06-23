import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./style";
import { theme } from "../../global/styles/theme";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  action?: ReactNode;
};

const Header: React.FC<Props> = ({ title, action }) => {
  const { secondary100, secondary40, heading } = theme.colors;
  const navigator = useNavigation();

  function handleGoBack() {
    navigator.goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={heading} />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {action && <View>{action}</View>}
    </LinearGradient>
  );
};

export default Header;
