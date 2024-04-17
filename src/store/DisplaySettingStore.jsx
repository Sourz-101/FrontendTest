import React, { createContext, useState, useEffect } from "react";

export const DisplaySetting = createContext();

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Check if there is data in localStorage, if not, use default values
    const savedData = localStorage.getItem("displaySettings");
    return savedData ? JSON.parse(savedData) : {
      pv: "pv",
      sv: "sv",
      temp: "temp",
      amp1: "amp",
      amp2: "amp2",
      rpm: "rpm"
    };
  });

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("displaySettings", JSON.stringify(data));
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
