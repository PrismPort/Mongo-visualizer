import React, { useEffect, useState } from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import ToggleSwitch from "../AtomarComponents/ToggleSwitch";
import SearchBar from "../AtomarComponents/SearchBar";

const StringList = ({ labels, counts, keyName }) => {
  const { updateToggleState } = useGraphContext();
  const [toggles, setToggles] = useState(
    labels.map((label, index) => ({
      value: label,
      occurance: counts[index],
      checked: true,
    }))
  );

  useEffect(() => {
    updateToggleState(keyName, toggles);
  }, []);

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

    // Update the toggle state in the GraphContext
    updateToggleState(keyName, updatedToggles);
    // Check if all toggles are true after update
    const allChecked = updatedToggles.every((item) => item.checked);
    setSelectAll(allChecked);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    const updatedAllToggles = toggles.map((item) => ({
      ...item,
      checked: !selectAll,
    }));
    setToggles(updatedAllToggles);

    updateToggleState(keyName, updatedAllToggles);
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
                  id={`${keyName}-${index}`} // Pass the index as the unique ID
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
