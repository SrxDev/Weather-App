import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Canvas,
  FitBox,
  LinearGradient,
  Path,
  rect,
  vec,
} from "@shopify/react-native-skia";

interface TrapezoidBackgroundProps {
  width: number;
  height: number;
}

const TrapezoidBackground = ({ width, height }: TrapezoidBackgroundProps) => {
  return (
    <Canvas style={{ width: width, height: height }}>
      <FitBox src={rect(0, 0, 266, 100)} dst={rect(0, 0, width, height)}>
        <Path
          style={"fill"}
          path={
            "M112 0H154C186 0 195.501 24.1398 205.732 48.6985C216.325 74.1247 227 100 262 100H4.00006C39.0001 100 49.6754 74.1247 60.2678 48.6985C70.4989 24.1398 80.0001 0 112 0Z"
          }
        >
          <LinearGradient
            start={vec(width / 2, height)}
            end={vec(width / 2, 0)}
            colors={["#262C51", "#3E3F74"]}
          />
        </Path>
        <Path
          style={"stroke"}
          strokeWidth={0.5}
          color={"rgba(117,130,244,0.5)"}
          path={
            "M112 0.25H154C169.923 0.25 180.229 6.24974 187.838 15.3006C195.21 24.0697 200.053 35.7041 204.994 47.575C205.163 47.9813 205.332 48.3879 205.502 48.7947L205.604 49.0418C210.863 61.6652 216.18 74.4274 224.525 84.0479C231.572 92.1732 240.777 98.0545 253.909 99.75H12.0914C25.2236 98.0545 34.4277 92.1732 41.4756 84.0479C49.8205 74.4273 55.137 61.6651 60.3957 49.0417L60.4986 48.7947C60.668 48.3879 60.8373 47.9813 61.0064 47.5751C65.9474 35.7041 70.79 24.0697 78.1619 15.3006C85.7708 6.24974 96.0772 0.25 112 0.25Z"
          }
        />
      </FitBox>
    </Canvas>
  );
};

export default TrapezoidBackground;

const styles = StyleSheet.create({});
