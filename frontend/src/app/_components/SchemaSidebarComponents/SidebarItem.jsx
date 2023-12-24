"use client";

import React, { useState } from "react";
import { EyeIcon } from "./EyeIcon.jsx";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(false);

  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  if (item.children) {
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
              className={`${
                visibility ? "m-1 text-gray-400" : "m-1 text-black"
              }`}
            >
              {Array.isArray(item.type) ? (
                <label>{item.type[0]}</label>
              ) : (
                <label>{item.type}</label>
              )}
            </div>
            <div
              className={`${
                visibility ? "m-1 text-gray-400" : "m-1 text-green-500"
              }`}
            >
              {Math.round(item.probability * 100)}%
            </div>
            <div className="m-1 cursor-pointer" onClick={() => setOpen(!open)}>
              {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </div>
          </span>
        </div>
        <div
          className={`${
            open ? "pt-1 h-auto overflow-auto" : "h-0 overflow-hidden"
          }`}
        >
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    const eyeId = generateRandomString(10);
    return (
      <div className="p-3 block bg-white rounded-lg">
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
              className={`${
                visibility ? "m-1 text-gray-400" : "m-1 text-black"
              }`}
            >
              {Array.isArray(item.type) ? (
                <label>{item.type[0]}</label>
              ) : (
                <label>{item.type}</label>
              )}
            </div>
            <div
              className={`${
                visibility ? "m-1 text-gray-400" : "m-1 text-green-500"
              }`}
            >
              {Math.round(item.probability * 100)}%
            </div>
          </span>
        </div>
      </div>
    );
  }
}
