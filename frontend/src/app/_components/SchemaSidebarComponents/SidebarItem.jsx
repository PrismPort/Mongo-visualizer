"use client";
import React, { useState, useContext } from "react";
import { EyeIcon } from "./EyeIcon.jsx";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useGraphContext } from "../../_context/GraphContext.js";
import { AppContext } from "../../_context/AppContext.js";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const { handleSelectItem } = useGraphContext(); // Use handleSelectItem instead of selectItems
  const { database, collection } = useContext(AppContext);

  const toggleOpen = () => setOpen(!open);

  const handleVisibilityChange = () => {
    setVisibility(!visibility);
    handleSelectItem(database, collection, item); // Pass necessary parameters
  };

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
            name={eyeId}
            id={eyeId}
            visibility={visibility}
            setVisibility={handleVisibilityChange}
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
