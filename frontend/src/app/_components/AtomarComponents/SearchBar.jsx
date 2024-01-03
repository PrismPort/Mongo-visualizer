import React from "react";

const SearchBar = () => {
  return (
    <div className="flex items-center relative w-48">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute left-4 w-4 h-4 text-gray-400"
      >
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        className="w-full h-10 pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-gray-200 text-gray-800 placeholder-gray-500 focus:border-green-300 focus:bg-white focus:ring-1 focus:ring-blue-200"
        type="search"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
