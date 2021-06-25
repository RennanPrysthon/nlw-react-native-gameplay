import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Alert,
  Share,
  Platform,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import * as Linkind from "expo-linking";

import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import Member, { MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { Header } from "../../components/Header";
import ButtonIcon from "../../components/ButtonIcon";

import { theme } from "../../global/styles/theme";

import Banner from "../../assets/banner.png";
import { styles } from "./style";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";

type RouteParams = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export const AppointmentDetails: React.FC = () => {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [membersCount, setMembersCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as RouteParams;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );

      setWidget(response.data);
      setMembersCount(response.data.members.length || 0);
    } catch {
      Alert.alert(
        "Verifique as configurações do servidor. O widget está habilitado?"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    if (!widget.instant_invite) return;

    const message =
      Platform.OS === "ios"
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    if (!widget.instant_invite) return;
    Linkind.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={Banner} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader title="Jogadores" subtitle={`Total ${membersCount}`} />

          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.member}
          />
        </>
      )}
      {guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      )}
    </Background>
  );
};
