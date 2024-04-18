import React, { createContext, useState, useEffect } from "react";

export const DisplaySetting = createContext();

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Check if there is data in localStorage, if not, use default values
    const savedData = localStorage.getItem("displaySettings");
    return savedData ? JSON.parse(savedData) : {
      machine:1,
      pv: "Initial Value",
      sv: "R1 Status",
      temp: "R2 Status",
      amp1: "Humidity",
      amp2: "SetValue2",
      rpm: "SetValue1"
    };
  });

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("displaySettings", JSON.stringify({
      machine:1,
      pv: "Initial Value",
      sv: "R1 Status",
      temp: "R2 Status",
      amp1: "Humidity",
      amp2: "SetValue2",
      rpm: "SetValue1"
    }));
  }, [data]);

  return (
    <DisplaySetting.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DisplaySetting.Provider>
  );
};

export default DisplaySettingContextProvider;
