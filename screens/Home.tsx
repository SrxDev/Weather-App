import { StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";
import HomeBackground from "../components/HomeBackground";
import WeatherInfo from "../components/section/WeatherInfo";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";
import { currentWeather } from "../data/CurrentWeather";
import { ForecastSheetProvider } from "../context/ForecastSheetContext";
import { createStackNavigator } from "@react-navigation/stack";

const Home = () => {
  return (
    
    <ForecastSheetProvider>
      <HomeBackground />
      <WeatherInfo  />
      <ForecastSheet />
      <WeatherTabBar />
    </ForecastSheetProvider>
  );
};

export default Home;

const styles = StyleSheet.create({});
