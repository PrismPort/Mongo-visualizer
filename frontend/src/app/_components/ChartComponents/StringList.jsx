import React, { useEffect, useState } from "react";

import ToggleSwitch from "../AtomarComponents/ToggleSwitch";
import SearchBar from "../AtomarComponents/SearchBar";

const StringList = ({ labels, counts, keyName }) => {
  // const [toggles, setToggles] = useState(
  //   toggleStates[keyName] ||
  //     labels.map((label, index) => ({
  //       value: label,
  //       occurance: counts[index],
  //       checked: true,
  //     }))
  // );

  // useEffect(() => {
  //   if (toggleStates[keyName]) {
  //     setToggles(toggleStates[keyName]);
  //   }
  // }, [toggleStates, keyName]);

  // const [selectAll, setSelectAll] = useState(
  //   toggles.every((toggle) => toggle.checked)
  // );

  // const handleToggleChange = (index) => {
  //   const updatedToggles = toggles.map((item, i) => {
  //     if (index === i) {
  //       return { ...item, checked: !item.checked };
  //     }
  //     return item;
  //   });
  //   setToggles(updatedToggles);
  //   updateToggleState(keyName, updatedToggles);
  //   setSelectAll(updatedToggles.every((item) => item.checked));
  // };

  // const handleSelectAllChange = () => {
  //   const newSelectAll = !selectAll;
  //   setSelectAll(newSelectAll);
  //   const updatedAllToggles = toggles.map((item) => ({
  //     ...item,
  //     checked: newSelectAll,
  //   }));
  //   setToggles(updatedAllToggles);
  //   updateToggleState(keyName, updatedAllToggles);
  // };

  return (
    <div>StringList</div>
    // <div className="flex flex-col items-center justify-center border-4 p-6 rounded-xl">
    //   <div className="flex justify-center items-center gap-8 p-4">
    //     <h2 className="text-xl font-bold">{keyName}</h2>
    //     <SearchBar />
    //   </div>
    //   <div className="w-full">
    //     <table className="table-auto w-full py-8">
    //       <colgroup>
    //         <col style={{ width: "40%" }} />
    //         <col style={{ width: "35%" }} />
    //         <col style={{ width: "25%" }} />
    //       </colgroup>
    //       <thead>
    //         <tr className="">
    //           <th className="px-2 py-4">
    //             <div className="flex justify-center items-center gap-2">
    //               <input
    //                 type="checkbox"
    //                 className="form-checkbox h-5 w-5 text-green-600"
    //                 checked={selectAll}
    //                 onChange={handleSelectAllChange}
    //               />
    //               <span>Select all</span>
    //             </div>
    //           </th>
    //           <th className="px-2 py-4">{keyName}</th>
    //           <th className="px-2 py-4">Occurrences</th>
    //         </tr>
    //       </thead>
    //     </table>
    //     <div className="overflow-y-auto h-96 my-2">
    //       <table className="table-auto w-full">
    //         <colgroup>
    //           <col style={{ width: "30%" }} />
    //           <col style={{ width: "45%" }} />
    //           <col style={{ width: "25%" }} />
    //         </colgroup>
    //         <tbody>
    //           {toggles.map((item, index) => (
    //             <tr key={index}>
    //               <td className="pl-8">
    //                 <ToggleSwitch
    //                   id={`${keyName}-${index}`}
    //                   checked={item.checked}
    //                   onChange={() => handleToggleChange(index)}
    //                 />
    //               </td>
    //               <td className="px-2 text-center">{item.value}</td>
    //               <td className="px-2 text-center">{item.occurance}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
};

export default StringList;
