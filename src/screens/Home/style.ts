import { StyleSheet, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getStatusBarHeight() + 26,
    marginBottom: 42,
  },
  matches: {
    marginTop: 24,
    marginLeft: 24,
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
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
    marginRight: 4,
    maxHeight: 56,
  },
  text: {
    padding: 24,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 20,
  },
});
