import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className=" text-white p-5 flex gap-2 justify-center items-center flex-row">
      <div className=" relative bg-brand-primary rounded-full w-12 h-12">
        <Image
          src={"/images/logo.png"}
          alt="MongoVisualizer Logo"
          fill="true"
          sizes="100%"
        ></Image>
      </div>
      <h3>MongoDB visualizer</h3>
    </div>
  );
}
