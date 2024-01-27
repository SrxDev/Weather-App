import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import useApplicationDimensions from "../../hooks/useApplicationDimensions";
import ForecastControl from "./elements/ForecastControl";
import Seperator from "./elements/Seperator";
import ForecastCapsule from "../forecast/ForecastCapsule";
import { hourly, weekly } from "../../data/ForecastData";
import ForecastScroll from "../forecast/ForecastScroll";
import { ForecastType } from "../../models/Weather";
import AirQualityWidget from "../forecast/widgets/AirQualityWidget";
import Widget from "../forecast/widgets/base/Widget";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import RainFallWidget from "../forecast/widgets/RainFallWidget";
import FeelsLikeWidget from "../forecast/widgets/FeelsLikeWidget";
import HumidityWidget from "../forecast/widgets/HumidityWidget";
import VisibilityWidget from "../forecast/widgets/VisibilityWidget";
import PressureWidget from "../forecast/widgets/PressureWidget";
import UvIndexWidget from "../forecast/widgets/UvIndexWidget";
import { size } from "@shopify/react-native-skia";
import WindWidget from "../forecast/widgets/WindWidget";
import SunriseWidget from "../forecast/widgets/SunriseWidget";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../../context/ForecastSheetContext";
import { useWeatherData } from "../../context/WeatherDataContext";
const ForecastSheet = () => {
  const { width, height } = useApplicationDimensions();
  const {weatherData:{hourlyForecast,weeklyForecast}} = useWeatherData();
  const smalLWidgetSize = width / 2 - 20;
  const snapPoints = ["38.5%", "83%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100);
  const minY = height - secondSnapPoint;
  const maxY = height - firstSnapPoint;
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;
  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly);
  const currentPosition = useSharedValue(0);
  const animatedPosition = useForecastSheetPosition();
  const translateXHourly = useSharedValue(0);
  const translateXWeekly = useSharedValue(width);
  const animatedHourlyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXHourly.value }],
    };
  });
  const animatedWeeklyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXWeekly.value }],
    };
  });
  useEffect(() => {
    if (selectedForecastType === ForecastType.Weekly) {
      translateXHourly.value = withTiming(-width);
      translateXWeekly.value = withTiming(-width);
    } else {
      translateXHourly.value = withTiming(0);
      translateXWeekly.value = withTiming(width);
    }
  }, [selectedForecastType]);
  const normalizePosition = (position: number) => {
    "worklet";
    return ((position - maxY) / (maxY - minY)) * -1;
  };
  useAnimatedReaction(
    () => {
      return currentPosition.value;
    },
    (cv) => {
      animatedPosition.value = normalizePosition(cv);
    }
  );
  return (
    <BottomSheet
      snapPoints={snapPoints}
      animatedPosition={currentPosition}
      animateOnMount={false}
      handleIndicatorStyle={{
        width: 48,
        height: 5,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      backgroundComponent={() => (
        <ForecastSheetBackground
          width={width}
          height={firstSnapPoint}
          cornerRadius={cornerRadius}
        />
      )}
    >
      <>
        <ForecastControl onPress={(type) => setSelectedForecastType(type)} />
        <Seperator width={width} height={3} />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Animated.View style={[animatedHourlyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={hourlyForecast}
              />
            </Animated.View>

            <Animated.View style={[animatedWeeklyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={weeklyForecast}
              />
            </Animated.View>
          </View>
          <View
            style={{ flex: 1, paddingTop: 30, paddingBottom: smalLWidgetSize }}
          >
            <AirQualityWidget width={width - 30} height={150} />

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: 15,
                gap: 10,
              }}
            >
              <UvIndexWidget width={smalLWidgetSize} height={smalLWidgetSize} />
              <WindWidget width={smalLWidgetSize} height={smalLWidgetSize} />
              <SunriseWidget width={smalLWidgetSize} height={smalLWidgetSize} />
              <RainFallWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <FeelsLikeWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <HumidityWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <VisibilityWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <PressureWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
            </View>
          </View>
        </ScrollView>
      </>
    </BottomSheet>
  );
};

export default ForecastSheet;

const styles = StyleSheet.create({});
