export interface Condition {
  text: string;
  icon: string;
}

export interface Location {
  name: string;
  country: string;
  localtime: string;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: Condition;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
}

export interface ForecastDay {
  date: string;
  day: {
    condition: Condition;
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
}

export interface WeatherError {
  message: string;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
  error?: WeatherError;
}
