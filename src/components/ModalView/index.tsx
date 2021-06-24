import React, { ReactNode } from "react";
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from "react-native";
import { Background } from "../Background";
import { styles } from "./style";

type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
};

export const ModalView: React.FC<Props> = ({
  children,
  closeModal,
  ...rest
}) => {
  return (
    <Modal transparent animationType="slide" {...rest} statusBarTranslucent>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
