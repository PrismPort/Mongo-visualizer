import React from "react";

export default function CollectionsList(database) {
  return (
    <div className="flex flex-col items-center justify-center border-4 p-6 rounded-xl">
      <div className="flex justify-center items-center gap-8 p-4">
        <h2 className="text-xl font-bold">{`${collectionName}`}</h2>
        <h3 className="text-xl font-bold">{`${numberOFdocuments} ${numberOfKeys} Keys`}</h3>
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
              <th className="px-2 py-4">{"key name"}</th>
              <th className="px-2 py-4">{`key type`}</th>
              <th className="px-2 py-4">{`distibution`}</th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto h-96 my-2">
          <table className="table-auto w-full">
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "45%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <tbody>
              {toggles.map((item, index) => (
                <tr key={index}>
                  <td className="pl-8">
                    <ToggleSwitch
                      id={`${keyName}-${index}`}
                      checked={item.checked}
                      onChange={() => handleToggleChange(index)}
                    />
                  </td>
                  <td className="px-2 text-center">{item.value}</td>
                  <td className="px-2 text-center">{item.occurance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
