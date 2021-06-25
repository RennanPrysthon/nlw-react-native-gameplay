import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Feather } from "@expo/vector-icons";

import { COLLECTION_APPOINTMENTTS } from "../../config/storage";
import DiscordSvg from "../../assets/discord.svg";
import { styles } from "./style";
import { theme } from "../../global/styles/theme";

import { Guilds } from "../Guilds";

import { CategorySelect } from "../../components/CategorySelect";
import { Header } from "../../components/Header";
import { ModalView } from "../../components/ModalView";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { Background } from "../../components/Background";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { GuildProps } from "../../components/Guild";
import { useEffect } from "react";
import { useRef } from "react";

export const AppointmentCreate: React.FC = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const [category, setCategory] = useState("");
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  const opacity = useRef(new Animated.Value(0.6)).current;

  const [isValid, setIsValid] = useState(false);

  function handleOpenModal() {
    setVisible(true);
  }
  function handleCloseModal() {
    setVisible(false);
  }

  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setVisible(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    if (!isValid) return;

    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  }

  useEffect(() => {
    let valid =
      !!category &&
      !!guild &&
      !!day &&
      !!month &&
      !!hour &&
      !!minute &&
      !!description;
    setIsValid(valid);
    Animated.timing(opacity, {
      toValue: valid ? 1 : 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [category, guild, day, month, hour, minute, description]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />
          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenModal}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image}>
                    <DiscordSvg width={40} height={40} />
                  </View>
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={28}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} onChangeText={setMinute} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descriçãp</Text>

              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <Animated.View style={[styles.footer, { opacity }]}>
              <Button title="Agendar" onPress={handleSave} />
            </Animated.View>
          </View>
        </ScrollView>
      </Background>
      <ModalView visible={visible} closeModal={handleCloseModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
};
