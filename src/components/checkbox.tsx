import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../constants";
import Color from "color";
import { AntDesign } from "expo-vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const TimingConfig = { duration: 150 };

export const Checkbox: React.FC<CheckboxProps> = React.memo(
  ({ label, checked, onPress }) => {
    const fadedActionColor = Color(ACTIVE_COLOR).alpha(0.1).toString();

    const rContainerStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(
          checked ? fadedActionColor : "transparent",
          TimingConfig
        ),
        borderColor: withTiming(
          checked ? ACTIVE_COLOR : INACTIVE_COLOR,
          TimingConfig
        ),
        paddingLeft: 20,
        paddingRight: !checked ? 20 : 14,
      };
    }, [checked]);

    const rTextStyle = useAnimatedStyle(() => {
      return {
        color: withTiming(
          checked ? ACTIVE_COLOR : INACTIVE_COLOR,
          TimingConfig
        ),
      };
    }, [checked]);

    return (
      <Animated.View
        layout={LinearTransition.springify().mass(0.7)}
        style={[styles.container, rContainerStyle]}
        onTouchEnd={onPress}
      >
        <Animated.Text style={[styles.label, rTextStyle]}>
          {label}
        </Animated.Text>
        {checked && (
          <Animated.View
            entering={FadeIn.duration(350)}
            exiting={FadeOut}
            style={{
              marginLeft: 8,
              alignItems: "center",
              justifyContent: "center",
              height: 20,
              width: 20,
            }}
          >
            <AntDesign name="checkcircle" size={20} color={ACTIVE_COLOR} />
          </Animated.View>
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: "SF-Pro-Rounded-Bold",
    color: "white",
  },
});
