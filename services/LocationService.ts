import * as Location from "expo-location";
import { Alert } from "react-native";
import { WeatherService } from "./WeatherService";

const getLocationData = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission to access location was denied");
    return null;
  }
  const location = await Location.getCurrentPositionAsync();
  return location.coords;
};

const fetchWeatherData = async (latitude: number, longitude: number) => {
  const service = new WeatherService(latitude, longitude);
  return await service.FetchAll();
};

export { getLocationData, fetchWeatherData };
