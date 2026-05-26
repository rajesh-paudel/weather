import React from "react";

const Home = () => {
  return (
    <div className=" min-h-screen flex flex-col max-w-6xl mx-auto ">
      <div className="flex justify-between items-center">
        <div className=" flex flex-col justify-center items-start">
          <div className="text-5xl font-bold pb-2">Toronto</div>
          <div className="font-semibold">
            Thrusday 31 august 2023 | 10:45 PM
          </div>
        </div>
        <div className=" relative max-w-lg w-full flex items-center justify-center ">
          <input
            type="text"
            placeholder="Enter city name "
            className="block w-full px-3 py-2 border-2 border-blue-900 rounded-lg"
          ></input>
          <button className="w-20 p-1.5 absolute top-1 right-0.5 bg-gray-200 rounded-md cursor-pointer hover:opacity-90">
            Search
          </button>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Home;
