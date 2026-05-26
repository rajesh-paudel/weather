import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { useEffect, useState } from "react";
import ForecastDay from "./ForecastDay";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7`,
      );

      const data = await res.json();
      setWeather(data);
      console.log(weather);
    } catch (error) {
      console.log("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    setCity(input);
    fetchWeather(input);
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return;
    const date = new Date(dateStr.replace(" ", "T"));

    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${weekday} ,  ${day} ${month} ${year} | ${time}`;
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className=" min-h-screen flex flex-col max-w-5xl mx-auto py-20 gap-10  px-4 sm:px-8  ">
      {/* row 1st */}
      <div className=" flex flex-col-reverse sm:flex-row  justify-between items-start sm:items-center gap-5">
        <div className=" flex flex-col justify-center items-start">
          <div className="text-5xl font-bold pb-2">
            {weather?.location?.name}
          </div>
          <div className="font-semibold">
            {formatDateTime(weather?.location.localtime)}
          </div>
        </div>
        <form
          onSubmit={handleSearch}
          className=" relative max-w-96 w-full flex items-center justify-center "
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter city name "
            className="block w-full px-3 py-2 border-2 border-white outline-none rounded-lg"
          ></input>
          <button
            type="submit"
            className="w-25 p-1.5 absolute top-1 right-0.5 bg-[#e5e7eb] text-[#0f172a] rounded-md  cursor-pointer hover:opacity-90"
          >
            Search
          </button>
        </form>
      </div>

      {/* row 2nd */}
      <div className="flex flex-col sm:flex-row sm:gap-10 items-start sm:items-center gap-5">
        <div className="flex items-center justify-center gap-6">
          <div className="text-8xl font-semibold">
            {isCelsius ? weather?.current.temp_c : weather?.current.temp_f}
          </div>
          <div className="flex flex-col justify-center items-start self-end mb-2">
            <div className="flex items-center justify-center gap-4 ">
              <button
                onClick={() => setIsCelsius(true)}
                className={`text-lg cursor-pointer  ${isCelsius ? "font-semibold " : "text-gray-500"}`}
              >
                &deg;C
              </button>
              <span className="border-r-2 border-gray-700  h-5"></span>
              <button
                onClick={() => setIsCelsius(false)}
                className={`text-lg cursor-pointer  ${isCelsius ? "text-gray-500" : "font-semibold "}`}
              >
                &deg;F
              </button>
            </div>
            <div className="text-xl font-semibold">
              {weather?.current.condition.text}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="w-50 h-50">
            <img
              src={weather?.current.condition.icon}
              alt="weather icon"
              className="w-full"
            ></img>
          </div>
          <div className="flex flex-col gap-1 justify-center items-start">
            <p className="flex items-center justify-center gap-2">
              <FaThermometerHalf />
              <span>Feels like : {weather?.current.feelslike_c}&deg;c</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <WiHumidity size={16} />
              <span>Humidity : {weather?.current.humidity}%</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <FaWind />
              <span>Wind: {weather?.current.wind_kph} km/h</span>
            </p>
          </div>
        </div>
      </div>

      {/* row 3rd */}
      <div className="flex items-center justify-between gap-5 border-2 border-white rounded-2xl p-4 flex-wrap">
        {weather?.forecast.forecastday.map((day) => {
          return <ForecastDay key={day.date} day={day} />;
        })}
      </div>
    </div>
  );
};

export default Home;
