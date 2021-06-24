import React from "react";

import { Image, Text, View, Alert, ActivityIndicator } from "react-native";
import IlustrationImage from "../../assets/illustration.png";
import ButtonIcon from "../../components/ButtonIcon";
import { styles } from "./style";
import { Background } from "../../components/Background";
import { useAuth } from "../../hooks/auth";
import { theme } from "../../global/styles/theme";

export const SignIn: React.FC = () => {
  const { signIn, loading } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
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
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title="Entre com o Discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
};
