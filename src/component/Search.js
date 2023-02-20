import React from "react";
import { FiSearch } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Search = ({ type }) => {
  return (
    <div className="relative">
      <FiSearch className="absolute top-5 left-6 text-xl text-black" />
      <input
        onChange={type}
        className="w-full py-[18px] pl-14 pr-14 text-base font-nunito font-medium text-gray rounded-2xl border border-solid border-gray/25 shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-none"
        type="text"
        placeholder="Search"
      />
      <BiDotsVerticalRounded className="absolute top-4 right-6 text-3xl cursor-pointer text-primary" />
    </div>
  );
};

export default Search;
