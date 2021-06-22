import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import Background from "./src/components/Background";

import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani";

import { StatusBar } from "react-native";
import { Routes } from "./src/routes";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </Background>
  );
};

export default App;
