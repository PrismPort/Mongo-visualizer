import React, { useContext } from "react";

import { AppContext } from "../_context/AppContext";

export default function AllDatabasesList(database) {
  const numberOfCollections = 0;

  const { databases, collectionDbMap } = useContext(AppContext);

  return (
    <div className=" grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-5">
      {databases.map((database, index) => (
        <div className="flex flex-col items-center justify-center border-4 p-6 rounded-xl">
          <div className="flex flex-col justify-center items-center gap-8 p-4">
            <h2 className="text-2xl font-bold">{`${database}`}</h2>
            <h3 className="text-xl -mt-2 font-bold">{`${numberOfCollections} collections`}</h3>
          </div>
          <div className="w-full">
            <table className="table-auto w-full py-8">
              <colgroup>
                <col style={{ width: "40%" }} />
                <col style={{ width: "35%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead>
                <tr className="">
                  <th className="px-2 py-4">{"collection name"}</th>
                  <th className="px-2 py-4">{`keys`}</th>
                  <th className="px-2 py-4">{`# of documents`}</th>
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto h-60 my-2">
              <table className="table-auto w-full">
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "45%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="pl-8">{"collectionName"}</td>
                    <td className="px-2 text-center">{"numberofKeys"}</td>
                    <td className="px-2 text-center">{"# of documents"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
