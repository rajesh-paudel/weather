import type { ForecastDay as ForecastDayType } from "../types";

interface ForecastDayProps {
  day: ForecastDayType;
  isCelsius: boolean;
}

const ForecastDay = ({ day, isCelsius }: ForecastDayProps) => {
  const getDay = (dateStr: string): string => {
    if (!dateStr) return "";

    const date = new Date(dateStr.replace(" ", "T"));

    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };
  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-lg bg-white/10 px-4 py-5 text-center">
      <div className="mb-2 font-semibold">{getDay(day.date)}</div>
      <div className="w-15 h-15 mb-3">
        <img
          className="w-full"
          src={day.day.condition.icon}
          alt="forecast day"
        ></img>
      </div>
      <div className="text-lg font-semibold">
        {isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f}&deg; -{" "}
        {isCelsius ? day.day.mintemp_c : day.day.mintemp_f}&deg;
      </div>
      <div className="mt-1 text-[14px] text-gray-300">
        {day.day.condition.text}
      </div>
    </div>
  );
};

export default ForecastDay;
