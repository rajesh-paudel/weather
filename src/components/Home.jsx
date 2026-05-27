import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import ForecastDay from "./ForecastDay";
import SearchHistoryModal from "./SearchHistoryModal";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
  const modalRef = useRef(null);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    const weatherSearchHistory = localStorage.getItem("weatherSearchHistory");
    return weatherSearchHistory ? JSON.parse(weatherSearchHistory) : [];
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const handlePointerDownOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside, true);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDownOutside,
        true,
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  useEffect(() => {
    localStorage.setItem("weatherSearchHistory", JSON.stringify(history));
  }, [history]);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7`,
      );

      const data = await res.json();
      setWeather(data);
      setError(null);
      if (data.error) {
        setWeather(null);
        setError(data.error);
        return;
      }
    } catch (error) {
      console.log("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setHistory((prev) => {
      const normalizedInput = trimmedInput.toLowerCase();
      const nextHistory = prev.filter(
        (item) => item.toLowerCase() !== normalizedInput,
      );

      return [trimmedInput, ...nextHistory];
    });
    setInput(trimmedInput);
    setCity(trimmedInput);
    fetchWeather(trimmedInput);
    setIsModalOpen(false);
  };
  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(input.toLowerCase()),
  );
  const handleDeleteHistory = (value) => {
    setHistory((prev) => prev.filter((item) => item !== value));
  };
  const handleSelectHistory = (value) => {
    setInput(value);
    setCity(value);
    fetchWeather(value);
    setIsModalOpen(false);
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
  const formatLocation = (location) => {
    if (location) {
      return `${location?.name},${location?.country}`;
    }
    return null;
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
          <div className="text-3xl sm:text-4xl font-bold pb-2">
            {formatLocation(weather?.location)}
          </div>
          <div className="font-semibold">
            {formatDateTime(weather?.location?.localtime)}
          </div>
        </div>

        <div ref={modalRef} className="relative max-w-96 w-full">
          <form
            onSubmit={handleSearch}
            className=" relative w-full flex items-center justify-center "
          >
            <input
              value={input}
              onFocus={() => setIsModalOpen(true)}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter city name "
              className="block w-full px-3 py-2 pr-24 border-2 border-white outline-none rounded-lg"
            ></input>
            <button
              type="submit"
              className="w-25 p-1.5 absolute top-1 right-0.5 bg-[#e5e7eb] text-[#0f172a] rounded-md  cursor-pointer hover:opacity-90"
            >
              Search
            </button>
          </form>
          {isModalOpen && history.length > 0 && (
            <div className="absolute top-full w-full left-0 mt-1 z-50">
              <SearchHistoryModal
                history={filteredHistory}
                handleDeleteHistory={handleDeleteHistory}
                selectHistory={handleSelectHistory}
              />
            </div>
          )}
        </div>
      </div>

      {/* row 2nd */}
      {weather ? (
        <div className="flex flex-col sm:flex-row sm:gap-10 justify-between items-start sm:items-center gap-8">
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
                {isCelsius ? (
                  <span>
                    Feels like : {weather?.current.feelslike_c} &deg;C
                  </span>
                ) : (
                  <span>
                    Feels like : {weather?.current.feelslike_f} &deg;F
                  </span>
                )}
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
      ) : (
        <div className="flex items-center justify-center  pt-20">
          {error?.message}
        </div>
      )}

      {/* row 3rd */}
      {weather && (
        <div className="flex items-center justify-between gap-5 border-2 border-white rounded-2xl p-4 flex-wrap">
          {weather?.forecast.forecastday.map((day) => {
            return (
              <ForecastDay key={day.date} day={day} isCelsius={isCelsius} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
