
import { Forecast, ForecastType, Weather, WeatherData, WeatherPointResponse, WeatherType } from "../models/Weather";
/**
 * 
 * 
 * This file is to be used for the weather-app demo and should not be 
 * put in any production environment. It's a hotchpotch to get the 
 * demo up and running.   
 */

export class WeatherService {
  private baseUrl: string;
  private nwsUrl: string;
  private city: string="";
  private state:string="";
  private API_KEY: string = "API_KEY_HERE";
  constructor(lat: number, lng: number) {
  
    this.baseUrl = `https://api.tomorrow.io/v4/weather/forecast?apikey=${this.API_KEY}&location=${lat},${lng}&units=imperial&timesteps=1d&timesteps=1h`;
    this.nwsUrl = `https://api.weather.gov/points/${lat},${lng}`;
  }
  
  public async FetchAll():Promise<WeatherData> {
    const response = await fetch(this.baseUrl);
    const data: WeatherForecast = await response.json();
    const minTemp =Math.floor(data.timelines.daily[0].values.temperatureMin)
    const maxTemp =  Math.floor(data.timelines.daily[0].values.temperatureMax)
    const currentTemp = Math.floor(data.timelines.hourly[0].values.temperature);
    const condition = weatherConditions[data.timelines.hourly[0].values.weatherCode];

    await this.fetchWeatherPoints()
    const currentWeather:Weather={
      temperature:currentTemp,
      condition:condition,
      high:maxTemp,
      low:minTemp,
      city:this.city
    }

    
    const hourly = data.timelines.hourly;
    const daily = data.timelines.daily;
    

    const hourlyForecast = [];
    const weeklyForecast=[];
   
    for (let i = 0; i < 6; i++) {

      var hour = hourly[i];
      var day =daily[i];
      let f:Forecast = {
        date: new Date(hour.time),
        high:Math.floor(hour.values.temperature),
        low:Math.floor(hour.values.temperature),
        temperature:Math.floor(hour.values.temperature),
        icon:this.mapIcons(),
        location:this.city,
        probability:Math.floor(hour.values.precipitationProbability),
        type: ForecastType.Hourly,
        weather: this.mapWeather(condition)
      }
      hourlyForecast.push(f);

      let d:Forecast = {
        date: new Date(day.time),
        high:Math.floor(day.values.temperatureMax),
        low:Math.floor(day.values.temperatureMin),
        temperature:Math.floor(day.values.temperatureMax),
        icon:this.mapIcons(),
        location:this.city,
        probability:Math.floor(day.values.precipitationProbabilityAvg),
        type: ForecastType.Weekly,
        weather: this.mapWeather(condition)
      }
      weeklyForecast.push(d);

    }
    return {currentWeather,hourlyForecast,weeklyForecast}

  }

  //Getting the national weather city, state
  private async fetchWeatherPoints(
   
    ): Promise<WeatherPointResponse | null> {
      try {
        //console.log(`${this.baseUrl}/points/${lat},${lng}`);
        const response = await fetch(`${this.nwsUrl}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: WeatherPointResponse = await response.json();
        this.city = data.properties.relativeLocation.properties.city;
        this.state = data.properties.relativeLocation.properties.state;
        return data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
      }
    }
  private icons = [
    require("../assets/forecast/windy.png"),
    require("../assets/forecast/rain.png"),
    require( "../assets/forecast/sun_rain.png")
  ]; 
  private mapIcons(): any {
     const randomIndex = Math.floor(Math.random() * this.icons.length);
     return (this.icons[randomIndex]);
 }
 
  private mapWeather(condition:string){
    if(condition.toLowerCase().indexOf('sun')){
      return WeatherType.Sunny
    }
    if(condition.toLowerCase().indexOf('rain')){
      return WeatherType.Rainy
    }
    if(condition.toLowerCase().indexOf('cloudy')){
      return WeatherType.Cloudy
    }
    if(condition.toLowerCase().indexOf('clear')){
      return WeatherType.Clear
    }
    if(condition.toLowerCase().indexOf('fog')){
      return WeatherType.Fog
    }
    return WeatherType.Clear;
  }
}

interface WeatherLocation {
  lat: number;
  lon: number;
  name: string;
  type: string;
}
interface WeatherForecast {
  timelines: Timelines;
  location: WeatherLocation;
}

interface Timelines {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

interface HourlyForecast {
  time: string;
  values: HourlyValues;
}

interface DailyForecast {
  time: string;
  values: DailyValues;
}

interface HourlyValues {
  cloudBase: number;
  cloudCeiling: number;
  cloudCover: number;
  dewPoint: number;
  evapotranspiration: number;
  freezingRainIntensity: number;
  humidity: number;
  iceAccumulation: number;
  iceAccumulationLwe: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainAccumulation: number;
  rainAccumulationLwe: number;
  rainIntensity: number;
  sleetAccumulation: number;
  sleetAccumulationLwe: number;
  sleetIntensity: number;
  snowAccumulation: number;
  snowAccumulationLwe: number;
  snowDepth: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

interface DailyValues {
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  evapotranspirationAvg: number;
  evapotranspirationMax: number;
  evapotranspirationMin: number;
  evapotranspirationSum: number;
  freezingRainIntensityAvg: number;
  freezingRainIntensityMax: number;
  freezingRainIntensityMin: number;
  humidityAvg: number;
  humidityMax: number;
  humidityMin: number;
  iceAccumulationAvg: number;
  iceAccumulationLweAvg: number;
  iceAccumulationLweMax: number;
  iceAccumulationLweMin: number;
  iceAccumulationLweSum: number;
  iceAccumulationMax: number;
  iceAccumulationMin: number;
  iceAccumulationSum: number;
  moonriseTime: string;
  moonsetTime: string;
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  pressureSurfaceLevelAvg: number;
  pressureSurfaceLevelMax: number;
  pressureSurfaceLevelMin: number;
  rainAccumulationAvg: number;
  rainAccumulationLweAvg: number;
  rainAccumulationLweMax: number;
  rainAccumulationLweMin: number;
  rainAccumulationMax: number;
  rainAccumulationMin: number;
  rainAccumulationSum: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sleetAccumulationAvg: number;
  sleetAccumulationLweAvg: number;
  sleetAccumulationLweMax: number;
  sleetAccumulationLweMin: number;
  sleetAccumulationLweSum: number;
  sleetAccumulationMax: number;
  sleetAccumulationMin: number;
  sleetIntensityAvg: number;
  sleetIntensityMax: number;
  sleetIntensityMin: number;
  snowAccumulationAvg: number;
  snowAccumulationLweAvg: number;
  snowAccumulationLweMax: number;
  snowAccumulationLweMin: number;
  snowAccumulationLweSum: number;
  snowAccumulationMax: number;
  snowAccumulationMin: number;
  snowAccumulationSum: number;
  snowDepthAvg: number;
  snowDepthMax: number;
  snowDepthMin: number;
  snowDepthSum: number;
  snowIntensityAvg: number;
  snowIntensityMax: number;
  snowIntensityMin: number;
  sunriseTime: string;
  sunsetTime: string;
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  uvHealthConcernAvg: number;
  uvHealthConcernMin: number;
  uvIndexAvg: number;
  uvIndexMax: number;
  uvIndexMin: number;
  visibilityAvg: number;
  visibilityMax: number;
  visibilityMin: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
}
const weatherConditions: { [code: number]: string } = {
  0: "Unknown",
  1000: "Clear, Sunny",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  4000: "Drizzle",
  4001: "Rain",
  4200: "Light Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5001: "Flurries",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6001: "Freezing Rain",
  6200: "Light Freezing Rain",
  6201: "Heavy Freezing Rain",
  7000: "Ice Pellets",
  7101: "Heavy Ice Pellets",
  7102: "Light Ice Pellets",
  8000: "Thunderstorm",
};