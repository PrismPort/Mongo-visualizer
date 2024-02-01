import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className=" text-white p-5 flex gap-8 justify-center items-center flex-row">
      <Image
        src={"/images/logo.png"}
        alt="Peek Logo"
        width={50}
        height={50}
      ></Image>
      <h3>Peek</h3>
    </div>
  );
}
