import { ImageSourcePropType } from "react-native";

export interface Weather {
  city: string;
  temperature: number;
  condition: string;
  high: number;
  low: number;
}

export enum WeatherType {
  Rainy= "Rainy",
  Windy="Windy",
  Stormy="Stormy",
  Clear="Clear",
  Cloudy="Cloudy",
  Showers="Showers",
  Sunny="Sunny",
  Tornado="Torando",
  Fog = "Patchy Fog"
}

export enum ForecastType {
  Hourly = "Hourly",
  Weekly = "Weekly"
}
export interface Forecast {
  date: Date;
  weather: WeatherType;
  probability: number;
  temperature: number;
  high: number;
  low: number;
  location: string;
  icon: ImageSourcePropType;
  type: ForecastType;
}

export interface WeatherForecastPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperatureTrend: string;
  temperature:number;
  probabilityOfPrecipitation: WeatherValueDetail;
  dewpoint: WeatherValueDetail;
  relativeHumidity: WeatherValueDetail;
  windDirection: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface WeatherValueDetail {
  value: number;
  maxValue: number;
  minValue: number;
  unitCode: string;
  qualityControl: string;
}

export interface WeatherForecastProperties {
  geometry: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  elevation: WeatherValueDetail;
  periods: WeatherForecastPeriod[];
}

export interface WeatherForecastFeature {
  id: string;
  type: string;
  properties: WeatherForecastProperties;
}
export interface WeatherPointProperties {
  geometry: string;
  id: string;
  type: string;
  cwa: string;
  forecastOffice: string;
  gridId: string;
  gridX: number;
  gridY: number;
  forecast: string;
  forecastHourly: string;
  forecastGridData: string;
  observationStations: string;
  forecastZone: string;
  relativeLocation:RelativeLocation;
  county: string;
  fireWeatherZone: string;
  timeZone: string;
  radarStation: string;
}
export interface RelativeLocation {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    city: string;
    state: string;
    distance: {
      unitCode: string;
      value: number;
    };
    bearing: {
      unitCode: string;
      value: number;
    };
  };
}
export interface WeatherPointResponse {
  id: string;
  type: string;
  properties: WeatherPointProperties;
}
export interface WeatherData {
  currentWeather: Weather;
  hourlyForecast: Forecast[];
  weeklyForecast: Forecast[];
}

export interface GridpointData {
  properties: {
    updateTime: string;
    validTimes: string;
    elevation: {
      value: number;
      unitCode: string;
    };
    temperature: TimeSeriesData;
    dewpoint: TimeSeriesData;
    minTemperature:TimeSeriesData;
    relativeHumidity:TimeSeriesData;
    maxTemperature:TimeSeriesData;
    // ... other weather data layers as needed
  };
  
}

export interface TimeSeriesData {
  uom: string;
  values: Array<{
    validTime: string;
    value: number | null;
  }>;
}
