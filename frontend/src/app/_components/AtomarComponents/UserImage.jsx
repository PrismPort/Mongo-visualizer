import React from "react";
import Image from "next/image";

export default function UserImage({ imageUrl, altText, size }) {
  const imageSrc = imageUrl || `/images/cocetto.jpg`;
  return (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full h-full w-full"
    >
      <Image src={imageSrc} alt={altText} layout="fill"></Image>
    </div>
  );
}
