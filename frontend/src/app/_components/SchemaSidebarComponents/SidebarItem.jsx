"use client";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { EyeIcon } from "./EyeIcon.jsx";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { toggleKeyVisibility } from "../../../lib/actions.js";

export default function SidebarItem({
  collectionKey,
  visibility,
  keyPath = [],
}) {
  const dispatch = useDispatch();
  const { database, collection, keyVisibilities } = useSelector(
    (state) => state.app
  ); // Include selectedKeys in the state

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const calculateNestedVisibility = (fieldKey) => {
    let currentVisibility = keyVisibilities[database]?.[collection];
    let path = [...keyPath, collectionKey.name, fieldKey]; // Include the parent keyPath

    for (const key of path) {
      if (currentVisibility === false) {
        return false;
      } else if (
        typeof currentVisibility === "object" &&
        currentVisibility !== null
      ) {
        currentVisibility = currentVisibility[key];
      } else {
        continue;
      }
    }

    return currentVisibility ?? false;
  };
  const handleVisibility = () => {
    dispatch(
      toggleKeyVisibility(
        [...keyPath, collectionKey.name],
        collectionKey.types[0].fields
      ) // Pass the nested keys to the action
    );
  };

  // SidebarItem.jsx
  const hasNestedFields = (item) => {
    if (item.types[0].bsonType === "Document" && item.types[0].fields) {
      return true;
    } else if (
      item.types[0].bsonType === "Array" &&
      item.types[0].types[0] &&
      item.types[0].types[0].bsonType === "Document"
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className={`p-3 ${open ? "bg-gray-100" : "bg-white"} rounded-lg`}>
      <div className="flex items-center justify-between text-sm">
        <div className="m-1">
          <EyeIcon
            name={collectionKey.name}
            id={collectionKey.name} // Use the adjusted keyName
            onClick={handleVisibility}
            visibility={visibility}
          />
        </div>
        <div className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {collectionKey.name}
        </div>
        <div className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {collectionKey.types[0].bsonType === "Array" &&
          collectionKey.types[0].types[0].bsonType !== "Document"
            ? `[${collectionKey.types[0].types[0].bsonType}]`
            : Array.isArray(collectionKey.type)
            ? collectionKey.type[0]
            : collectionKey.type}
        </div>
        <div className={`${visibility ? "text-green-500" : "text-gray-400"}`}>
          {Math.round(collectionKey.probability * 100)}%
        </div>
        {hasNestedFields(collectionKey) && (
          <div className="m-1 cursor-pointer" onClick={toggleOpen}>
            {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
        )}
      </div>
      {hasNestedFields(collectionKey) && open && (
        <div className="ml-4">
          {collectionKey.types[0].bsonType === "Document" &&
            collectionKey.types[0].fields.map((field, index) => (
              <SidebarItem
                key={index}
                collectionKey={field}
                keyPath={[...keyPath, collectionKey.name]}
                visibility={calculateNestedVisibility(field.name)}
              />
            ))}
          {collectionKey.types[0].bsonType === "Array" &&
            collectionKey.types[0].types[0].bsonType === "Document" &&
            collectionKey.types[0].types[0].fields.map((field, index) => (
              <SidebarItem
                key={index}
                collectionKey={field}
                keyPath={[...keyPath, collectionKey.name]}
                visibility={calculateNestedVisibility(field.name)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
