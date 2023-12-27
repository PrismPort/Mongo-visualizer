"use client";

import React, { useState } from "react";
import { EyeIcon } from "./EyeIcon.jsx"; // Make sure this import is correct
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(true);

  const toggleOpen = () => setOpen(!open);

  // Generate random ID for the EyeIcon
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

  // Function to determine if the item has nested fields or nested documents in arrays
  const hasNestedFields = (item) => {
    if (item.types && item.types[0]) {
      if (item.types[0].bsonType === "Document" && item.types[0].fields) {
        return true;
      } else if (
        item.types[0].bsonType === "Array" &&
        item.types[0].types[0] &&
        item.types[0].types[0].bsonType === "Document"
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={`p-3 ${open ? "bg-gray-100" : "bg-white"} rounded-lg`}>
      <div className="flex items-center justify-between text-sm">
        <div className="m-1">
          <EyeIcon
            label={item.name}
            name={eyeId} // eyeId should be a unique identifier
            id={eyeId}
            visibility={visibility}
            setVisibility={setVisibility}
          />
        </div>
        <div className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {item.name}
        </div>
        <div className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {Array.isArray(item.type) ? item.type[0] : item.type}
        </div>
        <div className={`${visibility ? "text-green-500" : "text-gray-400"}`}>
          {Math.round(item.probability * 100)}%
        </div>
        {hasNestedFields(item) && (
          <div className="m-1 cursor-pointer" onClick={toggleOpen}>
            {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
        )}
      </div>
      {hasNestedFields(item) && open && (
        <div className="pt-1 h-auto overflow-auto">
          {item.types[0].bsonType === "Array" &&
          item.types[0].types[0].bsonType === "Document"
            ? item.types[0].types[0].fields.map((nestedField, index) => (
                <SidebarItem key={`array-doc-${index}`} item={nestedField} />
              ))
            : item.types[0].fields.map((nestedField, index) => (
                <SidebarItem key={`doc-${index}`} item={nestedField} />
              ))}
        </div>
      )}
    </div>
  );
}
