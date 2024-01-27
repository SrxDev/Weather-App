import { StyleProp, StyleSheet } from "react-native";
import React from "react";
import {
  Canvas,
  Circle,
  Line,
  LinearGradient,
  Paint,
  Path,
  Skia,
  vec,
} from "@shopify/react-native-skia";
import { Feather } from "@expo/vector-icons";
import Widget, { WidgetDimensionsProps } from "./base/Widget";

const SunriseWidget = ({ width, height }: WidgetDimensionsProps) => {
  const cosWave = () => {
    const path = Skia.Path.Make();
    const canvasHeight = height / 2;
    const canvasWidth = width - 30;

    // Function to calculate y based on a cosine wave
    const calculateY = (x: number) => {
      // Scale x to fit one complete cosine wave (2π) across the canvas width
      const scaledX = (x / canvasWidth) * 2 * Math.PI;
      // Amplitude of the wave, adjust as needed
      const amplitude = 20; //canvasHeight / 4;
      // Calculate y, center the wave vertically in the canvas
      return amplitude * Math.cos(scaledX) + canvasHeight / 3;
    };

    // Starting point of the path at the left edge of the canvas
    path.moveTo(0, calculateY(0));

    // Plot the cosine wave across the canvas width
    for (let x = 1; x <= canvasWidth; x++) {
      path.lineTo(x, calculateY(x));
    }
    return path;
  };
  return (
    <>
      <Widget width={width} height={height}>
        <Widget.Header
          Icon={Feather}
          iconProps={{ name: "sunrise" }}
          contentText="sunrise"
        />
        <Widget.Body contentText="5:28 AM" contentSize="Large">
          <Canvas style={{ flex: 1 }}>
            <Path path={cosWave()} style={"stroke"} strokeWidth={5}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width - 30, 0)}
                positions={[0.1, 0.2, 0.25, 0.75, 0.8, 0.9]}
                colors={[
                  "#102756",
                  "#102756",
                  "#8CA4CC",
                  "#8CA4CC",
                  "#102756",
                  "#102756",
                ]}
              />
            </Path>

            <Line
              color={"white"}
              p1={vec(0, 40)}
              p2={vec(width - 20, 40)}
              strokeWidth={1}
            />
          </Canvas>
          <Canvas
            style={{
              ...StyleSheet.absoluteFillObject,

              width: 16,
              height: 16,
              top: height / 3,
              left: 28,
            }}
          >
            <Circle cx={8} cy={8} r={4} color={"white"}>
              <Paint style="stroke" strokeWidth={2} color="white" />
            </Circle>
          </Canvas>
        </Widget.Body>
        <Widget.Footer contentText="Sunset: 7:25PM" />
      </Widget>
    </>
  );
};

export default SunriseWidget;

const styles = StyleSheet.create({});
