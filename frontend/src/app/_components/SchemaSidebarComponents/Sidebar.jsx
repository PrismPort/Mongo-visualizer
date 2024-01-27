import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarItem from "./SidebarItem.jsx";

export default function Sidebar() {
  const { databaseMap, collection, database, keyVisibilities } = useSelector(
    (state) => state.app
  ); // Include selectedKeys in the state
  let collectionData;

  if (collection === "all") {
    return null;
  } else {
    //console.log("databaseMap", databaseMap);
    collectionData = Object.entries(databaseMap)
      .filter((item) => {
        return item[0] === database;
      })[0][1]
      .filter((item) => {
        return Object.keys(item)[0] === collection;
      })[0];
  }

  let keyData = Object.values(collectionData)[0];

  return (
    <>
      <div className="flex h-screen justify-end">
        <div className="w-full flex-shrink-0 bg-gray-400 h-full overflow-auto text-sm rounded-l-3xl border-2 border-black">
          <div className="p-2">
            <u>
              <b>SCHEMA</b>
            </u>
          </div>
          {keyData.map((key, index) => {
            return (
              <SidebarItem
                key={index}
                collectionKey={key}
                visibility={
                  keyVisibilities[database]?.[collection]?.[key.name] ?? false
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
