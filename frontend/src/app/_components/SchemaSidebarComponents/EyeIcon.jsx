"use client";

import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const EyeIcon = ({ name, id, visibility, onClick }) => {
  // set the toggle icons
  const visibleIcon = <LuEye className="text-gray-400" />;
  const notVisibleIcon = <LuEyeOff className="text-gray-600" />;

  // Create a new handler function

  return (
    <div className="relative">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="sr-only peer"
        checked={visibility ? true : false}
        onChange={onClick} // Use the new handler function
      />
      <label
        htmlFor={id} // Make sure this matches the id of the input
        className="peer-checked:text-gray-600 text-gray-400 cursor-pointer"
      >
        {visibility ? visibleIcon : notVisibleIcon}
      </label>
    </div>
  );
};

export { EyeIcon };
