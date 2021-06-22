import React from "react";
import { Image } from "react-native";
import { styles } from "./style";

export const GuildIcon: React.FC = () => {
  const uri =
    "https://img.ibxk.com.br/2021/05/14/14141728081248.jpg?w=704&h=264&mode=crop&scale=both";
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
};
