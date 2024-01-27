import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { setCollection } from "../../lib/reducers";
import { getColourClass } from "../_utils/getColourClass";

export default function AllDatabasesList() {
  const dispatch = useDispatch();
  const { databaseMap, database } = useSelector((state) => state.app);

  let collections = Object.entries(databaseMap).filter(
    (curDB) => curDB[0] === database
  )[0][1];

  return (
    <div
      className={`grid gap-5 grid-cols-1 md:${
        collections.length == 1
          ? " grid-cols-1"
          : collections.length == 2
          ? "grid-cols-2"
          : "grid-cols-2"
      } xl:${
        collections.length == 1
          ? " grid-cols-1"
          : collections.length == 2
          ? "grid-cols-2"
          : "grid-cols-3"
      }  p-5`}
    >
      {collections.map((collection, index) => {
        return (
          <div
            key={index}
            onClick={() => dispatch(setCollection(collection))}
            className="flex flex-col items-center justify-center border-brand-accent-3 border-4 p-6 rounded-3xl cursor-pointer"
          >
            <div className="flex flex-col justify-center items-center gap-6 p-4">
              <h2 className="text-2xl font-bold">{Object.keys(collection)}</h2>
              <h3 className="text-xl -mt-2 font-bold">{`${
                Object.values(collection)[0][0].count
              } documents ${Object.values(collection)[0].length} keys`}</h3>
            </div>
            <div className="w-full">
              <table className=" table-auto w-full py-8 text-left">
                <thead>
                  <tr className=" text-sm">
                    <th className=" pr-2 py-4">{"key name"}</th>
                    <th className=" px-2 py-4">{`key type`}</th>
                    <th className=" pl-2  py-4">{`distribution`}</th>
                  </tr>
                </thead>

                <tbody className="text-left">
                  {Object.values(collection)[0].map((key, index) => (
                    <tr key={index}>
                      <td className="pr-2">{key.name}</td>
                      <td className="px-2 text-center">{key.type}</td>
                      <td
                        className={`pl-2 text-center ${getColourClass(
                          key.probability * 100
                        )}`}
                      >
                        {key.probability
                          ? (key.probability * 100).toFixed(2) + "%"
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
