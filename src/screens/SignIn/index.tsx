import React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import IlustrationImage from "../../assets/illustration.png";
import ButtonIcon from "../../components/ButtonIcon";
import { styles } from "./style";

export const SignIn: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Image
        source={IlustrationImage}
        style={styles.image}
        resizeMode="stretch"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se {"\n"}e organize suas {"\n"} jogatinas {"\n"}
        </Text>
        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games {"\n"} favoritos com seus amigos
        </Text>
        <ButtonIcon title="Entre com o Discord" />
      </View>
    </View>
  );
};
