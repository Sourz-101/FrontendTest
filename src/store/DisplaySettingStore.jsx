import React, { createContext, useState, useEffect } from "react";

export const DisplaySetting = createContext();

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Check if there is data in localStorage, if not, use default values
    const savedData = localStorage.getItem("displaySettings");
    return savedData
      ? JSON.parse(savedData)
      : {
          1: {
            NAME: "Load Meter",
            RG: {
              "Process Value": 0,
              "R1 Status": 0,
              "R2 Status": 1,
              "Set 1": 0,
              "Set 2": 11111,
            },
          },
          2: {
            NAME: "MHT-9612M",
            RG: {
              Humidity: 622,
              SetValue1: 331,
              SetValue2: 492,
              "Relay1 Mode": 0,
              "Relay2 Mode": 0,
            },
          },
        };
  }, []); // <-- Added an empty dependency array

  useEffect(() => {
    // Save data to localStorage whenever it changes
    console.log("ds", data)
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
