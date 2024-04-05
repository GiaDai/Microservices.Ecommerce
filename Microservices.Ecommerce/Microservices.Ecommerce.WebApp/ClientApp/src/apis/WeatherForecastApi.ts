import { WeatherForecast } from "../store/WeatherForecasts";

export const fetchWeatherForecast = async (startDateIndex: number) => {
    const response = await fetch(`weatherforecast`);
    const data = await response.json() as Promise<WeatherForecast[]>;
    return data;
};