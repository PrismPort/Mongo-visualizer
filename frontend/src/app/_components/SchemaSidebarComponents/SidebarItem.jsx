"use client";

import React, { useState } from "react";
import { EyeIcon } from "./EyeIcon.jsx";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(false);

  // Check if the current item has nested fields within its types array
  const hasNestedFields = item.types && item.types[0] && item.types[0].fields;

  // Function to generate a unique ID for each eye icon
  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const eyeId = generateRandomString(10);

  return (
    <div
      className={`${
        open
          ? "p-3 block bg-gray-100 rounded-lg"
          : "p-3 block bg-white rounded-lg"
      }`}
    >
      <div className="flex text-sm justify-between">
        <span className="flex flex-row items-center justify-between w-full">
          <div className="m-1">
            <EyeIcon
              label={eyeId}
              name={eyeId}
              id={eyeId}
              setVisibility={setVisibility}
            />
          </div>
          <div
            className={`${
              visibility
                ? "m-1 font-bold text-gray-400"
                : "m-1 font-bold text-black"
            }`}
          >
            {item.name}
          </div>
          <div
            className={`${visibility ? "m-1 text-gray-400" : "m-1 text-black"}`}
          >
            {item.type}
          </div>
          <div
            className={`${
              visibility ? "m-1 text-gray-400" : "m-1 text-green-500"
            }`}
          >
            {Math.round(item.probability * 100)}%
          </div>
          {hasNestedFields && (
            <div className="m-1 cursor-pointer" onClick={() => setOpen(!open)}>
              {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </div>
          )}
        </span>
      </div>
      {hasNestedFields && open && (
        <div className="pt-1 h-auto overflow-auto">
          {item.types[0].fields.map((nestedItem, index) => (
            <SidebarItem key={index} item={nestedItem} />
          ))}
        </div>
      )}
    </div>
  );
}
