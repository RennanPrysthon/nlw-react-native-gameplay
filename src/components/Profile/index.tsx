import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";
import { styles } from "./style";

export const Profile: React.FC = () => {
  const {
    user: { avatar, firstName },
  } = useAuth();
  return (
    <View style={styles.container}>
      <Avatar urlImage={avatar} />

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá, </Text>

          <Text style={styles.username}>{firstName}</Text>
        </View>

        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  );
};
