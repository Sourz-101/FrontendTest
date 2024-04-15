import { createContext, useState } from "react";

export const DisplaySetting = createContext({
  data: {
    pv: "pv",
    sv: "sv",
    temp: "temp",
    amp: "amp",
    amp2: "amp2",
    rpm: "rpm",
  },
});

const DisplaySettingContextProvider = ({ children }) => {
  const [data, setData] = useState({
    pv: "spv",
    sv: "sv",
    temp: "tempu",
    amp: "amp",
    amp2: "amp2",
    rpm: "rpm",
  });

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

