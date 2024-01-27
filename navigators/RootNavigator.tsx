import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import WeatherList from "../screens/WeatherList";
import { eventEmitter } from "../utils/EventEmitter";
import { fetchWeatherData, getLocationData } from "../services/LocationService";
import { useWeatherData } from "../context/WeatherDataContext";

const Stack = createStackNavigator();
const RootNavigator = () => {
  const { setWeatherData } = useWeatherData();
  const handleLocationEvent = async () => {
    const locationData = await getLocationData();
    if (locationData) {
      const { latitude, longitude } = locationData;
      const weatherData = await fetchWeatherData(latitude, longitude);
      setWeatherData(weatherData);
      
    }
  };
  useEffect(() => {
    const listener = eventEmitter.addListener("locationEvent", async () => {
      await handleLocationEvent();
    });
    return () => listener.remove();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="list" component={WeatherList} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
