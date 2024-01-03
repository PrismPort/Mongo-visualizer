import React, { useState } from "react";
import ToggleSwitch from "../AtomarComponents/ToggleSwitch";
import SearchBar from "../AtomarComponents/SearchBar";

const StringList = ({ data, keyName }) => {
  const [toggles, setToggles] = useState(
    data.map((item) => ({ ...item, checked: false }))
  );

  // State for the "select all" checkbox
  const [selectAll, setSelectAll] = useState(false);

  const handleToggleChange = (index) => {
    const updatedToggles = toggles.map((item, i) => {
      if (index === i) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setToggles(updatedToggles);

    // Check if all toggles are true after update
    const allChecked = updatedToggles.every((item) => item.checked);
    setSelectAll(allChecked);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setToggles(toggles.map((item) => ({ ...item, checked: !selectAll })));
  };

  return (
    <div className="flex flex-col items-center justify-center border-4 p-6 rounded-xl">
      <div className=" flex justify-center items-center gap-8 p-4">
        <h2 className="text-xl font-bold">{keyName}</h2>
        <SearchBar></SearchBar>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-2">
              <div className="flex justify-center flex-row gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-600"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                <p>select all</p>
              </div>
            </th>
            <th className="px-2">{keyName}</th>
            <th className="px-2">ocurances</th>
          </tr>
        </thead>
        <tbody>
          {toggles.map((item, index) => (
            <tr key={index}>
              <td className="px-2">
                <ToggleSwitch
                  id={index} // Pass the index as the unique ID
                  checked={item.checked} // Use the `checked` property from the `toggles` state
                  onChange={() => handleToggleChange(index)}
                />
              </td>
              <td className="px-2">{item.value}</td>
              <td className=" px-2 text-center">{item.occurance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StringList;
