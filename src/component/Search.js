import React from "react";

const Search = ({ type }) => {
  return (
    <>
      <input
        onChange={type}
        className="w-full py-3 pl-5 pr-10 text-base font-nunito font-medium text-gray rounded-2xl border border-solid border-gray/10 shadow-[0_4px_4px_rgba(0,0,0,0.08)] focus:outline-none"
        type="text"
        placeholder="Search"
      />
    </>
  );
};

export default Search;
