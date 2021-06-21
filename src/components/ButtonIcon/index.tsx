import React, { useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import DiscordImg from "../../assets/discord.png";
import { styles } from "./style";

type Props = {
  title: string;
};

const ButtonIcon: React.FC<Props> = ({ title }) => {
  const size = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.timing(size, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
  };

  const onPressOut = () => {
    Animated.timing(size, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                scale: size.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          <Image source={DiscordImg} style={styles.icon} />
        </View>

        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default ButtonIcon;
