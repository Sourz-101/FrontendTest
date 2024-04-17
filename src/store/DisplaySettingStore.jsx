import { createContext, useState } from "react";

export const DisplaySetting = createContext();

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState(
    {
      pv: "pv",
      sv: "sv",
      temp: "temp",
      amp1: "amp",
      amp2: "amp2",
      rpm: "rpm"
    }
  );

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

