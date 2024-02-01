import React, { useEffect, useState } from "react";
import Breadcrumbs from "../AtomarComponents/Breadcrumbs";

import { MdContentCopy } from "react-icons/md";

import { useGraphContext } from "../../_context/GraphContext.js";

export default function HeaderBar() {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(currentQuery, null, 2)
      );
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy text");
    }
  };

  const { query } = useGraphContext();
  let currentQuery = query;

  // Reset copySuccess when currentQuery changes
  useEffect(() => {
    setCopySuccess("");
  }, [currentQuery]);

  return (
    <div className="flex justify-between items-center flex-row w-full px-12 py-8">
      <Breadcrumbs />
      <div className=" flex gap-2 justify-center items-center ">
        <p>generated query</p>
        <p className="px-4 max-w-vw20 py-2 border-2 border-neutral-950 rounded-md">
          {currentQuery
            ? `${JSON.stringify(currentQuery, null, 2).substring(0, 20)}...`
            : "No query generated"}
        </p>
        <button onClick={copyToClipboard}>
          <MdContentCopy />
        </button>
        {copySuccess && <div>{copySuccess}</div>}
        {/* <button className=" bg-green-800 py-2 px-8 mx-4 text-white rounded-md">
          <div className=" flex justify-center items-center gap-3">
            <p>show results</p>
            <svg
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0288662 6.6667L0.0288663 5.33336L8.02887 5.33336L4.3622 1.6667L5.30887 0.720029L10.5889 6.00003L5.30887 11.28L4.3622 10.3334L8.02887 6.6667L0.0288662 6.6667Z"
                fill="white"
              />
            </svg>
          </div>
        </button> */}
        {/* <SettingsIcon /> */}
        {/* <NotificationBell /> */}
      </div>
    </div>
  );
}
