"use client";

import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const EyeIcon = ({ label, name, id, visibility, setVisibility }) => {
  // set the toggle icons
  const visibleIcon = <LuEye className="text-gray-400" />;
  const notVisibleIcon = <LuEyeOff className="text-gray-600" />;

  return (
    <div className="relative">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="sr-only peer"
        checked={visibility}
        onChange={() => setVisibility(!visibility)}
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
