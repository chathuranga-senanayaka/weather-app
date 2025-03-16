"use server"; // Marks this as a Server Action in Next.js

// Importing necessary types and libraries
import { WeatherData } from "@/types/weather"; // Type definition for weather data
import { z } from "zod"; // Schema validation library

// Define a schema for validating weather data using Zod
const weatherSchema = z.object({
  name: z.string(), // City name
  main: z.object({
    temp: z.number(), // Temperature in Kelvin
    humidity: z.number(), // Humidity percentage
    feels_like: z.number(), // "Feels like" temperature in Kelvin
  }),
  weather: z.array(
    z.object({
      main: z.string(), // Main weather condition (e.g., "Clear")
      description: z.string(), // Weather description (e.g., "clear sky")
      icon: z.string(), // Weather icon code
    })
  ),
  wind: z.object({
    speed: z.number(), // Wind speed in meters/second
    deg: z.number(), // Wind direction in degrees
  }),
});

// Function to fetch weather data from the OpenWeatherMap API
export async function getWeatherData(
  city: string // City name as input
): Promise<{ data?: WeatherData; error?: string }> {
  try {
    // Validate that the city name is not empty
    if (!city.trim()) {
      return { error: "City is required" };
    }

    // Fetch weather data from the OpenWeatherMap API
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );

    // Check if the API request was successful
    if (!res.ok) {
      throw new Error("City not found"); // Throw an error if the city is not found
    }

    // Parse the JSON response from the API
    const rawData = await res.json();

    // Validate the API response against the weather schema
    const data = weatherSchema.parse(rawData);

    // Return the validated weather data
    return { data };
  } catch (error) {
    // Handle errors
    if (error instanceof z.ZodError) {
      // If the error is a Zod validation error, return a specific message
      return { error: "Invalid weather data received" };
    }

    // Return a generic error message for other errors
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch weather data",
    };
  }
}
