import React, { useState } from "react";

const MachineSelector = ({ array, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    onSelect(selectedOption); // Call the onSelect callback function with the selected option
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option></option>
         {array.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MachineSelector;
