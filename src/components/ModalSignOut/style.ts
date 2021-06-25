import { theme } from "./../../global/styles/theme";
import { StyleSheet, Dimensions } from "react-native";
const { height: H } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: theme.colors.overlay,
    flex: 1,
  },
  container: {
    height: 170,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 20,
    marginBottom: 28,
    marginTop: 29,
  },
  logo: {
    color: theme.colors.primary,
  },
  footer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",

    marginLeft: 4,
    marginRight: 4,
    maxHeight: 56,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.secondary30,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    padding: 24,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 20,
  },
});
