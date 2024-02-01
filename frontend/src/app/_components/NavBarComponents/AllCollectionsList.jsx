import React, { useContext, useState, useEffect } from "react";

import { handleAnalyze } from "../../_utils/handleAnalyzeCollection";
import { getColourClass } from "../../_utils/getColourClass";
import { AppContext } from "../../_context/AppContext";

export default function AllCollectionsList() {
  const { updateCollection, collections, database } = useContext(AppContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mycolls = collections[database] || [];
      const data = await Promise.all(
        mycolls.map((collection) => handleAnalyze(database, collection))
      );
      setData(data);
    };

    fetchData();
  }, [collections, database]);

  console.log("collections List", collections);

  return (
    <div
      className={`grid gap-5 grid-cols-1 md:${
        collections.length == 1
          ? " grid-cols-1"
          : collections.length == 2
          ? "grid-cols-2"
          : "grid-cols-2"
      } 2xl:${
        collections.length == 1
          ? " grid-cols-1"
          : collections.length == 2
          ? "grid-cols-2"
          : "grid-cols-3"
      }  p-5`}
    >
      {data.map((collectionData, index) => {
        let numberOfKeys = collectionData.length;
        let numberOfDocuments = collectionData[0].count;
        console.log("data", collectionData);
        return (
          //<div key={index}>`collection ${index}`</div>
          <div
            key={index}
            // onClick={updateCollection(collection)}
            className="flex flex-col items-center justify-center border-brand-accent-3 border-4 p-6 rounded-3xl cursor-pointer"
            onClick={() => updateCollection(collections[database][index])}
          >
            <div className="flex flex-col justify-center items-center gap-6 p-4">
              <h2 className="text-2xl font-bold">
                {collections[database][index]}
              </h2>
              <h3 className="text-xl -mt-2 font-bold">{`${numberOfDocuments} documents ${numberOfKeys} keys`}</h3>
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
                  {collectionData.map((key, index) => (
                    //  console.log("key", key),
                    <tr key={index}>
                      <td className="pr-2">{key.name}</td>
                      <td className="px-2 text-center">
                        {key.type == "Array"
                          ? `[${key.types[0].types[0].bsonType}]`
                          : Array.isArray(key.type)
                          ? key.type
                              .filter((item) => item !== "Undefined")
                              .join(" ")
                          : key.type}
                      </td>
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
