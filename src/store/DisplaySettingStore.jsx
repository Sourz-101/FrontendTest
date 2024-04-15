import { createContext, useState } from "react";

export const DisplaySetting = createContext({
  data: "",
});

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState("Empty");

  return (
    <DisplaySetting.Provider
      value={{
        data,
      }}
    >
      {children}
    </DisplaySetting.Provider>
  );
};

export default DisplaySettingContextProvider;
