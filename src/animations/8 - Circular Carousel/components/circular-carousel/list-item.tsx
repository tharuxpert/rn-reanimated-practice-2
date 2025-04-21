import { Dimensions, ImageProps, Image } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type CircularCarouselListItemProps = {
  imageSrc: ImageProps["source"];
  index: number;
  contentOffset: SharedValue<number>;
};

const { width: windowWidth } = Dimensions.get("window");

export const LISTITEMWIDTH = windowWidth / 4;

const CircularCarouselListItem: React.FC<CircularCarouselListItemProps> = ({
  imageSrc,
  index,
  contentOffset,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * LISTITEMWIDTH,
      (index - 1) * LISTITEMWIDTH,
      index * LISTITEMWIDTH,
      (index + 1) * LISTITEMWIDTH,
      (index + 2) * LISTITEMWIDTH,
    ];

    const translateYOutputRange = [
      0,
      -LISTITEMWIDTH / 3,
      -LISTITEMWIDTH / 2,
      -LISTITEMWIDTH / 3,
      0,
    ];

    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

    const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          translateY: translateY,
        },
        // Padding left is better than translateX
        // {
        //   translateX: LISTITEMWIDTH / 2 + LISTITEMWIDTH,
        // },
        {
          scale,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: LISTITEMWIDTH,
          aspectRatio: 1,
          elevation: 5,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 20,
        },
        rStyle,
      ]}
    >
      {/* 
        I've used the React Native Image because it was crashing on Android:
      */}
      <Image
        source={imageSrc}
        style={{
          margin: 3,
          height: LISTITEMWIDTH,
          width: LISTITEMWIDTH,

          borderRadius: 200,
          borderWidth: 2,
          borderColor: "white",
        }}
      />
    </Animated.View>
  );
};

export { CircularCarouselListItem };
