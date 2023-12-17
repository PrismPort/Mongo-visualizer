import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className=" p-5 flex gap-2 justify-center items-center flex-row">
      <Image
        src={"/images/logo.svg"}
        alt="MongoVisualizer Logo"
        width={50}
        height={50}
      ></Image>
      <h3>MongoDB visualizer</h3>
    </div>
  );
}
