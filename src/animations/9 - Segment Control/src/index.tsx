import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SegmentedControl } from "../components/segmented-control";
import { Palette } from "./constants";

const options = ["Light", "Standard", "Pro"];

export function App() {
  const [selectedOption, setSelectedOption] = useState("Standard");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
