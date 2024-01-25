import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { setDatabase } from "../../lib/reducers";
import Link from "next/link";

export default function AllDatabasesList() {
  const dispatch = useDispatch();
  const { databaseMap } = useSelector((state) => state.app);
  console.log(databaseMap);

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-5">
      {Object.entries(databaseMap).map((database) => {
        console.log("database at", database);

        return (
          <div
            key={database[0]}
            onClick={() => dispatch(setDatabase(database[0]))}
            className="flex flex-col items-center justify-center border-brand-accent-3 border-4 p-6 rounded-3xl cursor-pointer"
          >
            <div className="flex flex-col justify-center items-center gap-6 p-4">
              <h2 className="text-2xl font-bold">{database[0]}</h2>
              <h3 className="text-xl -mt-2 font-bold">{`${database[1].length} collections`}</h3>
            </div>
            <div className="w-full">
              <table className=" table-auto w-full py-8 text-left">
                <thead>
                  <tr className=" text-sm">
                    <th className=" pr-2 py-4">{"collections"}</th>
                    <th className=" px-2 py-4">{`keys`}</th>
                    <th className=" pl-2  py-4">{`documents`}</th>
                  </tr>
                </thead>

                <tbody className="text-left">
                  {database[1].map((collection) => (
                    <tr key={collection}>
                      <td className="pr-2">{Object.keys(collection)}</td>
                      <td className="px-2 text-center">
                        {Object.values(collection)[0].length}
                      </td>
                      <td className="pl-2 text-center">
                        {Object.values(collection)[0][0].count}
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
