"use client";
import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  // set the toggle colours
  const isToggledColor = `#4f4f52`;
  const isNotToggledColor = `#e2e2e2`;

  // Circle size remains the same
  const circleSize = 1.618; // 1.618em
  // The track width is now greater
  const trackHeight = 1; // 1em
  const trackWidth = circleSize * 1.618; // Equal to the circle's size for a more significant track

  // Calculate the translate value for the circle
  // Since the track width is now equal to the circle size, the circle needs to move its own diameter minus the track's height
  const translateXValue = `translateX(${trackWidth - circleSize}em)`;

  return (
    <div className="flex items-center justify-center py-2">
      <input
        type="checkbox"
        id="toggle"
        className="sr-only"
        checked={isToggled}
        onChange={() => setIsToggled(!isToggled)}
      />
      <label
        htmlFor="toggle"
        className={`block cursor-pointer transition-colors duration-300 ease-in-out relative shadow-md`}
        style={{
          width: `${trackWidth}em`, // Dynamic width based on the circle's size
          height: `${trackHeight}em`, // Height of 1em
          borderRadius: `${trackHeight / 2}em`, // Fully rounded edges
          backgroundColor: isToggled ? isToggledColor : isNotToggledColor,
          border: `2px solid ${isToggled ? isToggledColor : isNotToggledColor}`,
          boxSizing: "border-box", // Ensures the border is included in the width/height
        }}
      >
        <span
          className={`block bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out absolute`}
          style={{
            width: `${circleSize}em`, // Circle size of 1.618em diameter
            height: `${circleSize}em`, // Circle size of 1.618em diameter
            transform: isToggled ? translateXValue : "translateX(0)",
            top: "50%",
            left: "calc(50% - 0.5em)", // Half of the circle's size
            marginLeft: `-${circleSize / 2}em`, // Center the circle horizontally
            marginTop: `-${circleSize / 2}em`, // Center the circle vertically
            border: `2px solid ${
              isToggled ? isToggledColor : isNotToggledColor
            }`,
          }}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
