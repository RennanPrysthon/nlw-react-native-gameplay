import React from "react";
import {
  View,
  Text,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "../../hooks/auth";
import { Background } from "../Background";
import { styles } from "./style";

type Props = ModalProps & {
  closeModal: () => void;
};

export const ModalSignOut: React.FC<Props> = ({ closeModal, ...rest }) => {
  const { signOut } = useAuth();

  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>

      <Background style={styles.container}>
        <Text style={styles.title}>
          Deseja sair do Game<Text style={styles.logo}>Play</Text>
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={closeModal}
            activeOpacity={0.6}
          >
            <Text style={styles.text}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={signOut}
            activeOpacity={0.6}
          >
            <Text style={styles.text}>Sim</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </Modal>
  );
};
