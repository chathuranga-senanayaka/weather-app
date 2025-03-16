"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Search, Thermometer, Wind } from "lucide-react";
import React, { useState } from "react";
import { getWeatherData } from "./action";
import { WeatherData } from "@/types/weather";
import { Card, CardContent } from "@/components/ui/card";

//StEP 02
function SubmitButton() {
  return (
    <Button type="submit">
      <Search className="w-4 h-4" />
    </Button>
  );
}

//STEP 05
export default function Home() {
  //STEP 08
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const handleSearch = async (formData: FormData) => {
    const city = formData.get("city") as string;
    const { data } = await getWeatherData(city);
    //STEP 09
    if (data) {
      setWeather(data);
    }
  };

  //STEP 01
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className="flex gap-2">
          <Input
            name="city"
            type="text"
            placeholder="Enter city name..."
            className="bg-white/90"
            required
          />
          <SubmitButton />
        </form>
        {/* STEP 10 */}
        {weather && (
          <div>
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">{weather.name}</h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].main}
                      width={64}
                      height={64}
                    />
                    <div className="text-5xl font-bold">
                      {Math.round(weather.main.temp)}K
                    </div>
                  </div>
                  <div className="text-gray-500 mt-1 capitalize">
                    {weather.weather[0].description}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                    <div className="mt-2 text-sm">Feels Like</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.feels_like)}°C
                    </div>
                  </div>
                  <div className="text-center">
                    <Droplet className="w-6 h-6 mx-auto text-blue-500" />
                    <div className="mt-2 text-sm">Humidity</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.humidity)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-6 h-6 mx-auto text-teal-500" />
                    <div className="mt-2 text-sm">Wind</div>
                    <div className="font-semibold">
                      {Math.round(weather.wind.speed)}m/s
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
