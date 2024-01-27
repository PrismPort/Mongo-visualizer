import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarItem from "./SidebarItem.jsx";
import { setSelectedKeys } from "../../../lib/reducers";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { collection, selectedKeys } = useSelector((state) => state.app); // Include selectedKeys in the state

  if (collection === "all") {
    return null;
  }

  let keyData = Object.values(collection)[0];
  console.log("keyData", keyData);

  const handleVisibilityToggle = (keyName) => {
    if (selectedKeys.includes(keyName)) {
      dispatch(setSelectedKeys(selectedKeys.filter((key) => key !== keyName)));
    } else {
      dispatch(setSelectedKeys([...selectedKeys, keyName]));
    }
  };

  return (
    <>
      <div className="flex h-screen justify-end">
        <div className="w-full flex-shrink-0 bg-gray-400 h-full overflow-auto text-sm rounded-l-3xl border-2 border-black">
          <div className="p-2">
            <u>
              <b>SCHEMA</b>
            </u>
          </div>
          {keyData.map((item, index) => {
            const keyName = item.parentKey
              ? `${item.parentKey}.${item.name}`
              : item.name;
            return (
              <SidebarItem
                key={index}
                item={item}
                onVisibilityToggle={handleVisibilityToggle} // Pass the new handler function
                visibility={selectedKeys.includes(keyName)} // Set visibility based on whether the key is in selectedKeys
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
