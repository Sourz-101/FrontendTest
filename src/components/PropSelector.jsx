import React, { useState } from 'react'

const PropSelector = ( { array, onSelect, currentVal}) => {
    console.log(array)
    if(!array) return;
    const [selectedProp, setSelectedProp] = useState(currentVal);

    const handleChange = (e) => {
      const selectedProp = e.target.value;
      setSelectedProp(selectedProp);
      onSelect(selectedProp); // Call the onSelect callback function with the selected option
    };

  return (
    <div>
      <select
        value={selectedProp}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >

      <option>Select</option>
         {Object.keys(array)?.map((option, index) => (

          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PropSelector


