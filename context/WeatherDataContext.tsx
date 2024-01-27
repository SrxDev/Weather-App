import { ReactNode, createContext, useContext, useState } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { WeatherData } from "../models/Weather";
import { currentWeather } from "../data/CurrentWeather";
import { hourly, weekly } from "../data/ForecastData";

interface WeatherDataProviderProps {
  children: ReactNode;
}
interface WeatherContextType {
  weatherData: WeatherData;
  setWeatherData: (data: WeatherData) => void;
}
const defaultWeatherData = {
  currentWeather: currentWeather,
  hourlyForecast: hourly,
  weeklyForecast: weekly,
};

export const WeatherDataContext = createContext<WeatherContextType>({
  weatherData: defaultWeatherData,
  setWeatherData: () => {},
});

export const WeatherDataProvider = ({ children }: WeatherDataProviderProps) => {
  const [weatherData,setWeatherData] = useState<WeatherData>(defaultWeatherData)
  return (
    <WeatherDataContext.Provider value={{weatherData,setWeatherData}}>
      {children}
    </WeatherDataContext.Provider>
  );
};
export const useWeatherData = (): WeatherContextType => {
  const context = useContext(WeatherDataContext);
  if (context === null) {
    throw new Error(
      "useWeatherData must be used within a Weather Data Provider"
    );
  }
  return context;
};
