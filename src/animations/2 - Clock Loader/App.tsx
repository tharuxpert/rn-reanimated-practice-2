import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { N } from './constants'
import Square from "./components/Square";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      {new Array(N).fill(0).map((_, index) => {
        return <Square key={index} index={index} progress={progress} />;
      })}

      {/* for my convenience */}
      {/* <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: "10%",
    backgroundColor: "#2e2e2e",
    padding: 15,
    borderRadius: 20,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "white",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
});
