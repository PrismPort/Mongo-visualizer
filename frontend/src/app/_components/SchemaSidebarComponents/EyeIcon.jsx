"use client";

import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const EyeIcon = ({ label, name, id, setVisibility }) => {
  const [isToggled, setIsToggled] = useState(true);

  // set the toggle icons
  const isToggledIcon = <LuEye className="text-gray-400" />;
  const isNotToggledIcon = <LuEyeOff className="text-gray-600" />;

  return (
    <div className="relative">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="sr-only peer"
        checked={isToggled}
        onChange={() => {
          setIsToggled(!isToggled);
          setVisibility(isToggled);
        }}
      />
      <label
        htmlFor={label}
        className="peer-checked:text-gray-600 text-gray-400 cursor-pointer"
      >
        {isToggled ? isToggledIcon : isNotToggledIcon}
      </label>
    </div>
  );
};

export { EyeIcon };
