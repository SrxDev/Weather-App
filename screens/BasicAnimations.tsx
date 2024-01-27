import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const BasicAnimations = () => {
  const SIZE = 200;
  const scale = useSharedValue(1);
  const borderRadius = useSharedValue(0);
  const squareCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: interpolate(borderRadius.value,[0,1],[-300,100]) },
      ],
      borderRadius: borderRadius.value * SIZE,
    };
  });
  useEffect(() => {
    scale.value = withRepeat(withSpring(2), -1, true);
    borderRadius.value = withRepeat(withSpring(1), -1, true);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: "red" },
          squareCircleStyle,
        ]}
      ></Animated.View>
    </View>
  );
};

export default BasicAnimations;

const styles = StyleSheet.create({});
