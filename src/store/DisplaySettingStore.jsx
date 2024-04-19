import React, { createContext, useState, useEffect } from "react";

export const DisplaySetting = createContext();

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Check if there is data in localStorage, if not, use default values
    const savedData = localStorage.getItem("displaySettings");
    return savedData ? JSON.parse(savedData) : {
      pv:{props:"Process Value",machine:"1"},
      sv:{props:"R1 Status",machine:"1"},
      amp:{props:"Humidity",machine:"2"},
      amp2:{props:"SetValue2",machine:"2"},
      temp:{props:"SetValue1",machine:"2"},
      rpm:{props:"Set 2",machine:"1"},
      vol1:{props:"Set 2", machine:"1"},
      vol2:{props:"Humidity",machine:"2"}
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
