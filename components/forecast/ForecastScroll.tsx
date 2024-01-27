import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Forecast } from "../../models/Weather";
import { ScrollView } from "react-native-gesture-handler";
import ForecastCapsule from "./ForecastCapsule";

interface ForecastScrollProps {
  forecasts: Forecast[];
  capsuleWidth: number;
  capsuleHeight: number;
  capsuleRadius: number;
}
const ForecastScroll = ({
  forecasts,
  capsuleHeight,
  capsuleRadius,
  capsuleWidth,
}: ForecastScrollProps) => {
  return (
    <ScrollView
      horizontal
      style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 10,flexGrow:0 }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 12 }}>
        {forecasts.map((forecast, i) => (
          <ForecastCapsule
            width={capsuleWidth}
            height={capsuleHeight}
            radius={capsuleRadius}
            forecast={forecast}
            key={i}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ForecastScroll;

const styles = StyleSheet.create({});
