import React from "react";
import Image from "next/image";

export default function CustomButton({
  text,
  imageSrc,
  imageSize,
  IconComponent,
  variant,
  onClick,
  ...props
}) {
  // Define base styles and conditional styles based on the variant
  const baseStyles =
    "flex justify-center items-center flex-row m-4 gap-3 px-4 py-2 rounded focus:outline-none";
  const variantStyles = {
    active:
      "text-white flex justify-center items-center flex-row m-2 bg-gray-500",
    inactive: "bg-transparent text-white text-black",
    // Add more variants as needed
  };

  return (
    <button
      className={` hover:bg-buttonHoverBg ${baseStyles} ${
        variantStyles[variant] || " "
      }`}
      onClick={onClick} // Use the onClick prop
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="props.text"
          width={imageSize || 50}
          height={imageSize || 50}
          className={props.rounded ? "rounded-full mr-1" : "mr-1"}
        />
      )}

      <p>{text}</p>
      {IconComponent && <IconComponent className="h-5 w-5 mr-2" />}
    </button>
  );
}
