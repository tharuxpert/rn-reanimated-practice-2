import React, { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { useWindowDimensions } from "react-native";
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import { useSharedValue, withSpring } from "react-native-reanimated";
import Touchable, { useGestureHandler } from "react-native-skia-gesture";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RADIUS = 80;

function App() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const cx = useSharedValue(windowWidth / 2);
  const cy = useSharedValue(windowHeight / 2);

  const context = useSharedValue({
    x: 0,
    y: 0,
  });

  const gestureHandler = useGestureHandler({
    onStart: () => {
      "worklet";
      context.value = {
        x: cx.value,
        y: cy.value,
      };
    },
    onActive: ({ translationX, translationY }) => {
      "worklet";
      cx.value = translationX + context.value.x;
      cy.value = translationY + context.value.y;
    },
    onEnd: () => {
      "worklet";
      cx.value = withSpring(windowWidth / 2);
      cy.value = withSpring(windowHeight / 2);
    },
  });

  const layer = useMemo(() => {
    return (
      <Paint>
        <Blur blur={30} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias (Offset)
            // prettier-ignore
            1, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 1, 0, 0,
            // prettier-ignore
            0, 0, 0, 60, -30,
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <Touchable.Canvas style={{ flex: 1, backgroundColor: "#111" }}>
      <Group layer={layer}>
        <Touchable.Circle {...gestureHandler} cx={cx} cy={cy} r={RADIUS} />
        <Circle cx={windowWidth / 2} cy={windowHeight / 2} r={RADIUS} />
        <SweepGradient c={vec(0, 0)} colors={["cyan", "magenta", "cyan"]} />
      </Group>
    </Touchable.Canvas>
  );
}

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
};
