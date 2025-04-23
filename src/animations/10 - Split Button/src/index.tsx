import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Palette } from "./constants";
import { StatusBar } from "expo-status-bar";
import { SplitButton } from "../components/split-button";

function App() {
  const [splitted, setSplitted] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SplitButton
        splitted={splitted}
        mainAction={{
          label: "Stop",
          onPress: () => setSplitted(true),
          backgroundColor: Palette.card,
        }}
        leftAction={{
          label: "Resume",
          onPress: () => setSplitted(false),
          backgroundColor: Palette.card,
        }}
        rightAction={{
          label: "Finish",
          onPress: () => setSplitted(false),
          backgroundColor: Palette.highlight,
        }}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
