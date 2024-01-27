import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Canvas,
  Circle,
  Line,
  LinearGradient,
  Shadow,
  vec,
} from "@shopify/react-native-skia";

interface CircleButtonProps {
  radius: number;
  pressed: Boolean;
}
const CircleButton = ({ radius, pressed }: CircleButtonProps) => {
  const diameter = radius * 2;
  return (
    <Canvas style={{ width: diameter, height: diameter }}>
      <Circle cx={radius} cy={radius} r={radius}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(diameter, diameter)}
          colors={[
            pressed ? "#BBBFC7" : "#F5F5F9",
            pressed ? "#FFFFFF" : "#DADFE7",
          ]}
        />
        <Shadow dx={1} dy={1} blur={0.5} color={"white"} inner />
      </Circle>
      <Line
        p1={vec(radius - radius / 3, radius)}
        p2={vec(radius + radius / 3, radius)}
        style={"stroke"}
        strokeCap={"round"}
        strokeWidth={4}
        color={"#48319D"}
      />
      <Line
        p1={vec(radius, radius - radius / 3)}
        p2={vec(radius, radius + radius / 3)}
        style={"stroke"}
        strokeCap={"round"}
        strokeWidth={4}
        color={"#48319D"}
      />
    </Canvas>
  );
};

export default CircleButton;

const styles = StyleSheet.create({});
