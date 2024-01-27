import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setDatabase, setCollection } from "../../../lib/reducers";

export default function Breadcrumbs() {
  const dispatch = useDispatch();
  const { collection, database } = useSelector((state) => state.app);

  return (
    <div className=" flex justify-center items-center">
      <svg
        className="mr-2 cursor-pointer"
        onClick={() => {
          dispatch(setDatabase("all"));
          dispatch(setCollection("all"));
        }}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99984 0L11.3332 4V12H7.99984V7.33333H3.99984V12H0.666504V4L5.99984 0Z"
          fill="#7B809A"
        />
      </svg>

      {database === "all" ? (
        <p
          onClick={() => {
            dispatch(setDatabase("all"));
            dispatch(setCollection("all"));
          }}
          className="cursor-pointer pr-1"
        >
          {`all databases `}
        </p>
      ) : (
        <p
          onClick={() => {
            dispatch(setCollection("all"));
          }}
          className="cursor-pointer mr-1"
        >
          {database}
        </p>
      )}
      {collection === "all" ? (
        <p>{` \\  all collections`}</p>
      ) : (
        <p>{` \\ ${Object.keys(collection)}`}</p>
      )}
    </div>
  );
}
