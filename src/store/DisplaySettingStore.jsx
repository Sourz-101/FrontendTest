import { createContext, useState } from "react";

export const DisplaySetting = createContext();

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState(
    {
      pv: "",
      sv: "",
      temp: "",
      amp1: "",
      amp2: "",
      rpm: ""
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

