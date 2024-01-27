"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EyeIcon } from "./EyeIcon.jsx";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export default function SidebarItem({
  item: key,
  visibility,
  onVisibilityToggle,
  parentKeyName = "", // Add a new optional prop for the parent key name
}) {
  const { selectedKeys } = useSelector((state) => state.app); // Include selectedKeys in the state
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

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

  // SidebarItem.jsx
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

  // Adjust keyName for nested items
  const keyName = parentKeyName ? `${parentKeyName}.${key.name}` : key.name;

  return (
    <div className={`p-3 ${open ? "bg-gray-100" : "bg-white"} rounded-lg`}>
      <div className="flex items-center justify-between text-sm">
        <div className="m-1">
          <EyeIcon
            label={key.name}
            name={key.name}
            id={`eye-${keyName}`} // Use the adjusted keyName
            visibility={visibility}
            onClick={() => onVisibilityToggle(keyName)} // Pass the adjusted keyName
          />
        </div>
        <div className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {key.name}
        </div>
        <div className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {key.types[0].bsonType === "Array" &&
          key.types[0].types[0].bsonType !== "Document"
            ? `[${key.types[0].types[0].bsonType}]`
            : Array.isArray(key.type)
            ? key.type[0]
            : key.type}
        </div>
        <div className={`${visibility ? "text-green-500" : "text-gray-400"}`}>
          {Math.round(key.probability * 100)}%
        </div>
        {hasNestedFields(key) && (
          <div className="m-1 cursor-pointer" onClick={toggleOpen}>
            {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
        )}
      </div>
      {hasNestedFields(key) && open && (
        <div className="pt-1 h-auto overflow-auto">
          {key.types[0].bsonType === "Array"
            ? key.types[0].types[0].fields.map((nestedField, index) => (
                <SidebarItem
                  key={`array-doc-${index}`}
                  item={nestedField}
                  parentKeyName={keyName} // Pass the parent key name
                  onVisibilityToggle={onVisibilityToggle}
                  visibility={selectedKeys.includes(
                    `${keyName}.${nestedField.name}`
                  )} // Compute visibility for nested item
                />
              ))
            : (key.types[0].fields || []).map((nestedField, index) => (
                <SidebarItem
                  key={`doc-${index}`}
                  item={nestedField}
                  parentKeyName={keyName} // Pass the parent key name
                  onVisibilityToggle={onVisibilityToggle}
                  visibility={selectedKeys.includes(
                    `${keyName}.${nestedField.name}`
                  )} // Compute visibility for nested item
                />
              ))}
        </div>
      )}
    </div>
  );
}
