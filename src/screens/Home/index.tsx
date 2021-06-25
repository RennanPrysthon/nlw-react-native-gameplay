import React, { useState, useCallback } from "react";
import { View, FlatList, Text } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLLECTION_APPOINTMENTTS } from "../../config/storage";
import { styles } from "./style";

import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { Profile } from "../../components/Profile";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { Loading } from "../../components/Loading";
import { ModalSignOut } from "../../components/ModalSignOut";

export const Home: React.FC = () => {
  const navigation = useNavigation();

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [appoinments, setAppoinments] = useState<AppointmentProps[]>([]);

  const [signOutOpen, setSignOutOpen] = useState(false);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate("AppointmentDetails", {
      guildSelected,
    });
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  async function fetchAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTTS);
    const storageResponse: AppointmentProps[] = storage
      ? JSON.parse(storage)
      : [];

    if (category) {
      setAppoinments(
        storageResponse.filter((item) => item.category === category)
      );
    } else {
      setAppoinments(storageResponse);
    }

    setLoading(false);
  }

  function handleSignOut() {
    setSignOutOpen(true);
  }

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [category])
  );

  return (
    <>
      <Background>
        <View style={styles.container}>
          <View style={styles.header}>
            <Profile handleSignOut={handleSignOut} />
            <ButtonAdd onPress={handleAppointmentCreate} />
          </View>

          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
          />
          {loading ? (
            <Loading />
          ) : (
            <>
              <ListHeader
                title="Partidas agendadas"
                subtitle={`Total ${appoinments.length}`}
              />
              <FlatList
                data={appoinments}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => (
                  <Appointment
                    data={item}
                    onPress={() => handleAppointmentDetails(item)}
                  />
                )}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
                contentContainerStyle={{ paddingBottom: 69 }}
              />
            </>
          )}
        </View>
      </Background>
      <ModalSignOut
        animationType="fade"
        closeModal={() => setSignOutOpen(false)}
        visible={signOutOpen}
      />
    </>
  );
};
