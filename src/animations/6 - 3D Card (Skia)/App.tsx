import React from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BackgroundGradient } from "./components/BackgroundGradient";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { rotateX } from "@shopify/react-native-skia";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HEIGHT = 256;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

function App() {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_WIDTH], [10, -10], Extrapolation.CLAMP)
      );

      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_HEIGHT], [-10, 10], Extrapolation.CLAMP)
      );
    })
    .onUpdate((event) => {
      // topLeft (10deg, -10deg)
      // topRight (10deg, 10deg)
      // bottomRight (-10deg, 10deg)
      // bottomLeft (-10deg, -10deg)

      rotateX.value = interpolate(
        event.y,
        [0, CARD_WIDTH],
        [10, -10],
        Extrapolation.CLAMP
      );

      rotateY.value = interpolate(
        event.x,
        [0, CARD_HEIGHT],
        [-10, 10],
        Extrapolation.CLAMP
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;

    return {
      transform: [
        {
          perspective: 300,
        },
        { rotateX: rotateXvalue },
        { rotateY: rotateYvalue },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BackgroundGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
              backgroundColor: "black",
              position: "absolute",
              borderRadius: 20,
              zIndex: 300,
            },
            rStyle,
          ]}
        >
          <View style={styles.skeletonUIContainer}>
            <View style={styles.circle} />
            <View style={styles.placeholderContainer}>
              <View style={styles.placeholder} />
              <View style={styles.placeholder} />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonUIContainer: {
    position: "absolute",
    bottom: "10%",
    left: "10%",
    flexDirection: "row",
  },
  circle: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: "#272F46",
  },
  placeholderContainer: {
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "space-around",
  },
  placeholder: {
    height: 20,
    width: 80,
    borderRadius: 25,
    backgroundColor: "#272F46",
  },
});

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
};
