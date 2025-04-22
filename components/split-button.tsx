import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Palette } from "../src/constants";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { PressableScale } from "./pressable-scale";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type SplitAction = {
  label: string;
  onPress: () => void;
  backgroundColor: string;
};

type SplitButtonProps = {
  splitted: boolean;
  mainAction: SplitAction;
  leftAction: SplitAction;
  rightAction: SplitAction;
};

const buttonHeight = 60;

const SplitButton: React.FC<SplitButtonProps> = React.memo(
  ({ mainAction, leftAction, rightAction, splitted }) => {
    const { width: windowWidth } = useWindowDimensions();

    const paddingHorizontal = 20;
    const gap = 10;
    const SplittedButtonWidth = (windowWidth - paddingHorizontal * 2 - gap) / 2;

    const rLeftButtonStyle = useAnimatedStyle(() => {
      const leftButtonWidth = splitted ? SplittedButtonWidth : 0;
      return {
        width: withTiming(leftButtonWidth),
        opacity: withTiming(splitted ? 1 : 0),
      };
    }, [splitted]);

    const rLeftTextStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(splitted ? 1 : 0, { duration: 150 }),
      };
    }, [splitted]);

    const rMainButtonStyle = useAnimatedStyle(() => {
      const mainButtonWidth = splitted
        ? SplittedButtonWidth
        : SplittedButtonWidth * 2;
      return {
        width: withTiming(mainButtonWidth),
        marginLeft: withTiming(splitted ? gap : 0),
        backgroundColor: withTiming(
          splitted ? rightAction.backgroundColor : mainAction.backgroundColor
        ),
      };
    }, [splitted]);

    const rMainTextStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(splitted ? 0 : 1),
      };
    }, [splitted]);

    const rRightTextStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(splitted ? 1 : 0),
      };
    }, [splitted]);

    return (
      <View
        style={{
          width: "100%",
          height: buttonHeight,
          paddingHorizontal,
          flexDirection: "row",
        }}
      >
        <Animated.View
          onTouchEnd={leftAction.onPress}
          style={[
            {
              backgroundColor: leftAction.backgroundColor,
            },
            styles.button,
            rLeftButtonStyle,
          ]}
        >
          <Animated.Text
            numberOfLines={1}
            style={[styles.label, rLeftTextStyle]}
          >
            {leftAction.label}
          </Animated.Text>
        </Animated.View>

        <PressableScale
          onPress={splitted ? rightAction.onPress : mainAction.onPress}
          style={[styles.button, rMainButtonStyle]}
        >
          <Animated.Text style={[styles.label, rMainTextStyle]}>
            {mainAction.label}
          </Animated.Text>
          <Animated.Text style={[styles.label, rRightTextStyle]}>
            {rightAction.label}
          </Animated.Text>
        </PressableScale>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    height: buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    // borderCurve: "continuous", Only work on IOS
  },
  label: {
    fontSize: 16,
    color: Palette.text,
    fontFamily: "FiraCode-Regular",
    textTransform: "lowercase",
    position: "absolute",
  },
});

export { SplitButton };
