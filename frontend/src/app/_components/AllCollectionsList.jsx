import React, { useContext } from "react";
import { AppContext } from "../_context/AppContext";

export default function AllCollectionsList() {
  const { databases, keysAndDocsInfo } = useContext(AppContext);

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-5">
      {databases.map((database) => {
        const collectionsInfo = keysAndDocsInfo[database];
        const numberOfCollections = collectionsInfo
          ? Object.keys(collectionsInfo).length
          : 0;

        return (
          <div className="flex flex-col items-center justify-center border-brand-accent-3 border-4 p-6 rounded-3xl">
            <div className="flex flex-col justify-center items-center gap-6 p-4">
              <h2 className="text-2xl font-bold">{database}</h2>
              <h3 className="text-xl -mt-2 font-bold">{`${numberOfCollections} collections`}</h3>
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
                  {collectionsInfo &&
                    Object.entries(collectionsInfo).map(
                      ([collectionName, collection]) => (
                        <tr key={collectionName}>
                          <td className="pr-2">{collectionName}</td>
                          <td className="px-2 text-center">
                            {collection.keys.length}
                          </td>
                          <td className="pl-2 text-center">
                            {collection.keys[0].count}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
          // </div>
        );
      })}
    </div>
  );
}
