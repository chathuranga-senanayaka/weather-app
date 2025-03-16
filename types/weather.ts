// Define the WeatherData interface to represent the structure of weather data
export interface WeatherData {
  name: string; // City name
  main: {
    temp: number; // Temperature in Kelvin
    humidity: number; // Humidity percentage
    feels_like: number; // "Feels like" temperature in Kelvin
  };
  weather: Array<{
    main: string; // Main weather condition (e.g., "Clear")
    description: string; // Weather description (e.g., "clear sky")
    icon: string; // Weather icon code
  }>;
  wind: {
    speed: number; // Wind speed in meters/second
    deg: number; // Wind direction in degrees
  };
}
