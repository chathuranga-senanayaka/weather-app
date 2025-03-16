"use client"; // Marks this as a Client Component in Next.js

// Importing necessary components and libraries
import { Button } from "@/components/ui/button"; // Custom button component
import { Input } from "@/components/ui/input"; // Custom input component
import { Droplet, Search, Thermometer, Wind } from "lucide-react"; // Icons for UI
import React, { useState } from "react"; // React and useState hook for state management
import { getWeatherData } from "./action"; // Function to fetch weather data
import { WeatherData } from "@/types/weather"; // Type definition for weather data
import { Card, CardContent } from "@/components/ui/card"; // Custom card components
import { useFormStatus } from "react-dom"; // Hook to track form submission status
import { motion } from "framer-motion"; // Library for animations

// SubmitButton Component: Handles the form submission button
function SubmitButton() {
  // useFormStatus hook to track if the form is being submitted
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {/* Search icon with spin animation when pending */}
      <Search className={`w-4 h-4 ${pending ? "animate-spin" : ""}`} />
    </Button>
  );
}

// Home Component: Main component for the weather app
export default function Home() {
  // State to store weather data and error messages
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  // Function to handle form submission and fetch weather data
  const handleSearch = async (formData: FormData) => {
    // Reset weather and error states before making a new request
    setWeather(null);
    setError("");

    // Get the city name from the form input
    const city = formData.get("city") as string;

    // Fetch weather data using the getWeatherData function
    const { data, error: weatherError } = await getWeatherData(city);

    // Log any errors to the console
    console.log(error);

    // If there's an error, update the error state
    if (weatherError) {
      setError(weatherError);
    }

    // If data is received, update the weather state
    if (data) {
      setWeather(data);
    }
  };

  // Render the UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        {/* Search Form */}
        <form action={handleSearch} className="flex gap-2">
          <Input
            name="city"
            type="text"
            placeholder="Enter city name..."
            className="bg-white/90"
            required
          />
          {/* Submit Button */}
          <SubmitButton />
        </form>

        {/* Error Message Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animation when component mounts
            exit={{ opacity: 0 }} // Animation when component unmounts
            transition={{ duration: 0.3 }} // Animation duration
            className="text-red-200 text-center bg-red-500/20 rounded-md p-2"
          >
            {error}
          </motion.div>
        )}

        {/* Weather Data Display */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animation when component mounts
            exit={{ opacity: 0 }} // Animation when component unmounts
            transition={{ duration: 0.3 }} // Animation duration
          >
            {/* Weather Card */}
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                {/* City Name and Temperature */}
                <div className="text-center mb-4">
                  <motion.h2
                    initial={{ scale: 0.5 }} // Initial animation state
                    animate={{ scale: 1 }} // Animation when component mounts
                    className="text-2xl font-bold"
                  >
                    {weather.name} {/* City Name */}
                  </motion.h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {/* Weather Icon */}
                    <motion.img
                      initial={{ opacity: 0, y: 10 }} // Initial animation state
                      animate={{ opacity: 1, y: 0 }} // Animation when component mounts
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].main}
                      width={64}
                      height={64}
                    />
                    {/* Temperature */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }} // Initial animation state
                      animate={{ opacity: 1, x: 0 }} // Animation when component mounts
                      transition={{ delay: 0.2 }} // Animation delay
                      className="text-5xl font-bold"
                    >
                      {Math.round(weather.main.temp - 273.15)}°C{" "}
                      {/* Convert Kelvin to Celsius */}
                    </motion.div>
                  </div>
                  {/* Weather Description */}
                  <motion.div
                    initial={{ opacity: 0 }} // Initial animation state
                    animate={{ opacity: 1 }} // Animation when component mounts
                    transition={{ delay: 0.3 }} // Animation delay
                    className="text-gray-500 mt-1 capitalize"
                  >
                    {weather.weather[0].description}
                  </motion.div>
                </div>

                {/* Additional Weather Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} // Initial animation state
                  animate={{ opacity: 1, y: 0 }} // Animation when component mounts
                  transition={{ delay: 0.4 }} // Animation delay
                  className="grid grid-cols-3 gap-4 mt-6"
                >
                  {/* Feels Like Temperature */}
                  <motion.div
                    whileHover={{ scale: 1.05 }} // Hover animation
                    className="text-center"
                  >
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                    <div className="mt-2 text-sm">Feels Like</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.feels_like - 273.15)}°C
                    </div>
                  </motion.div>

                  {/* Humidity */}
                  <motion.div
                    whileHover={{ scale: 1.05 }} // Hover animation
                    className="text-center"
                  >
                    <Droplet className="w-6 h-6 mx-auto text-blue-500" />
                    <div className="mt-2 text-sm">Humidity</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.humidity)}%
                    </div>
                  </motion.div>

                  {/* Wind Speed */}
                  <motion.div
                    whileHover={{ scale: 1.05 }} // Hover animation
                    className="text-center"
                  >
                    <Wind className="w-6 h-6 mx-auto text-teal-500" />
                    <div className="mt-2 text-sm">Wind</div>
                    <div className="font-semibold">
                      {Math.round(weather.wind.speed)}m/s
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
