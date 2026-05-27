import React from "react";
import { IoCloseSharp } from "react-icons/io5";
const SearchHistoryModal = ({
  history,
  handleDeleteHistory,
  selectHistory,
}) => {
  if (history.length == 0) return null;
  return (
    <div className="w-full bg-white text-gray-700 rounded-md  flex flex-col  ">
      <div className="px-4 text-{14px}  py-2 border-b border-gray-100">
        recent searches
      </div>
      {history?.slice(0, 5).map((his) => {
        return (
          <div
            key={his}
            onClick={() => selectHistory(his)}
            className="flex cursor-pointer  items-center gap-5 px-4 py-2 hover:bg-gray-200"
          >
            <p className="truncate flex-1">{his}</p>
            <IoCloseSharp
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteHistory(his);
              }}
              size={20}
              className="cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SearchHistoryModal;
