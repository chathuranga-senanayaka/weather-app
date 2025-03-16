// STEP 04

"use server";

import { WeatherData } from "@/types/weather";

//STEP 07
export async function getWeatherData(
  city: string
): Promise<{ data?: WeatherData; error?: string }> {
  try {
    if (!city.trim()) {
      return { error: "City is required" };
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    if (!res.ok) {
      throw new Error("City not found");
    }
    const data = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
    return {};
  }
}
