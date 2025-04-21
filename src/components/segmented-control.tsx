import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Palette } from "../../constants";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const { width: windowWidth } = useWindowDimensions();

    const internalPadding = 20;
    const segmentControlWidth = windowWidth - 40;

    const itemWidth = (segmentControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentControlWidth,
            borderRadius: 20,
            paddingHorizontal: internalPadding / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            styles.activeBox,
            rStyle,
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}
            >
              <Text style={styles.label}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    backgroundColor: Palette.baseGray05,
    zIndex: 1,
  },
  activeBox: {
    position: "absolute",
    top: "10%",
    zIndex: -1,
    height: "80%",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Palette.background,
  },
  labelContainer: { justifyContent: "center", alignItems: "center" },
  label: {
    fontFamily: "SF-Compact-Rounded-Medium",
    fontSize: 16,
  },
});

export { SegmentedControl };
