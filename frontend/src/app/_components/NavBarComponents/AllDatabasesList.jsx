import React, { useContext, useState, useEffect } from "react";
import { handleAnalyze } from "../../_utils/handleAnalyzeCollection";
import { AppContext } from "../../_context/AppContext";

export default function AllDatabasesList() {
  const {
    updateDatabase,
    collections,
    databases,
    fetchCollectionsForDatabase,
    loadingDatabases,
  } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        databases.map(async (database) => {
          await fetchCollectionsForDatabase(database);
          const dbCollections = collections[database] || [];
          const analyzedData = await Promise.all(
            dbCollections.map((collection) =>
              handleAnalyze(database, collection)
            )
          );
          return {
            database,
            collections: dbCollections,
            analyzedData,
          };
        })
      );
      setData(data);
    };

    fetchData();
  }, [databases]);

  console.log("databases in alllist", data);
  return (
    <div
      className={`grid gap-5 grid-cols-1 md:${
        data.length == 1
          ? " grid-cols-1"
          : data.length == 2
          ? "grid-cols-2"
          : "grid-cols-2"
      } 2xl:${
        data.length == 1
          ? " grid-cols-1"
          : data.length == 2
          ? "grid-cols-2"
          : "grid-cols-3"
      }  p-5`}
    >
      {data.map((database, index) => {
        return (
          <div
            key={index}
            onClick={() => updateDatabase(Object.values(database)[0])}
            className="flex flex-col items-center justify-center border-brand-accent-3 border-4 p-6 rounded-3xl cursor-pointer"
          >
            <div className="flex flex-col justify-center items-center gap-6 p-4">
              <h2 className="text-2xl font-bold">
                {Object.values(database)[0]}
              </h2>
              <h3 className="text-xl -mt-2 font-bold">{`${
                Object.values(database)[1].length
              } collections`}</h3>
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
                  {Object.values(database)[1].map((collection, index) => (
                    <tr key={index}>
                      <td className="pr-2">{collection}</td>
                      <td className="px-2 text-center">
                        {
                          (console.log("database in map", database),
                          database.analyzedData[index].length)
                        }
                      </td>

                      <td className="pl-2 text-center">
                        {database.analyzedData[index][0]
                          ? database.analyzedData[index][0].count
                          : null}
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
