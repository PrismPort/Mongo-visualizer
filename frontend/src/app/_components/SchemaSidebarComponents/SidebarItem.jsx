"use client";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { EyeIcon } from "./EyeIcon.jsx";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { toggleKeyVisibility } from "../../../lib/actions.js";

export default function SidebarItem({ bordercolor = null, item: key,
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
    <>
      <tr className={`${open ? "bg-gray-100" : "bg-white"} rounded-lg`}>
        <td className=''>
          <EyeIcon
            name={collectionKey.name}
            id={collectionKey.name} // Use the adjusted keyName
            onClick={handleVisibility}
            visibility={visibility}
          />
        </td>
        {bordercolor === null ?
          <td className={`${visibility ? "text-black" : "text-gray-400"}`}>
            <b>{key.name}</b>
          </td>
          :
          <td className={`border-l-[2px] border-solid border-${bordercolor} ${visibility ? "text-black" : "text-gray-400"}`}>
            <b>{key.name}</b>
          </td>
        }
        <td className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {hasNestedFields(key) && (
            <div className="" onClick={toggleOpen}>
              {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </div>
          )}
        </td>
        <td className={`${visibility ? "text-black" : "text-gray-400"}`}>
          {Array.isArray(key.type) ? key.type[0] : key.type}
        </td>
        <td className={`${visibility ? "text-green-500" : "text-gray-400"}`}>
          {Math.round(key.probability * 100)}%
        </td>
      </tr>

      {hasNestedFields(key) && open && (
        <>{
          key.types[0].bsonType === "Array" &&
            key.types[0].types[0].bsonType === "Document"
            ? key.types[0].types[0].fields.map((nestedField, index) => (
              <SidebarItem bordercolor={'blue'} key={`array-doc-${index}`} item={nestedField} />
            ))
            : key.types[0].fields.map((nestedField, index) => (
              <SidebarItem bordercolor={'blue'} key={`doc-${index}`} item={nestedField} />
            ))
        }</>
      )}
    </>
  );
}

function GreenCell({visibility, children}){

}

function Cell({ visibility, children }) {
  return visibility
    ?
    <CellVisible>
      {children}
    </CellVisible>
    :
    <CellInvisible>
      {children}
    </CellInvisible>

}

function CellInvisible({ children }) {
  return (
    <td className={'text-gray-400'}>
      {children}
    </td>
  );
}

function CellVisible({ children }) {
  return (
    <td className={'text-black'}>
      {children}
    </td>
  );
}
