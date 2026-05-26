import React from "react";

const ForecastDay = ({ day }) => {
  const getDay = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr.replace(" ", "T"));

    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mb-2">{getDay(day?.date)}</div>
      <div className="w-15 h-15 mb-3">
        <img
          className="w-full"
          src={day?.day.condition.icon}
          alt="forecast day"
        ></img>
      </div>
      <div>
        {day?.day.maxtemp_c}&deg; - {day?.day.mintemp_c}&deg;
      </div>
      <div className="text-[14px]">{day?.day.condition.text}</div>
    </div>
  );
};

export default ForecastDay;
