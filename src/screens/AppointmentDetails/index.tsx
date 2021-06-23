import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";

import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import Member from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import Header from "../../components/Header";
import ButtonIcon from "../../components/ButtonIcon";

import { theme } from "../../global/styles/theme";
import { ImageBackground, Text, View, FlatList } from "react-native";

import Banner from "../../assets/banner.png";
import { styles } from "./style";

export const AppointmentDetails: React.FC = () => {
  const member = [
    {
      id: "1",
      username: "Rennan",
      avatar_url: "http://github.com/RennanPrysthon.png",
      status: "online",
    },
    {
      id: "2",
      username: "Teste",
      avatar_url: "http://github.com/RennanPrysthon.png",
      status: "offline",
    },
  ];
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={Banner} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 3" />

      <FlatList
        data={member}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={ListDivider}
        style={styles.member}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
};
