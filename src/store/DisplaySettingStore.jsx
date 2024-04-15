import { createContext, useState } from "react";

export const DisplaySetting = createContext({
  initial: "",
});

const DisplaySettingContextProvider = ({ children }) => {
  const [initial, setInitial] = useState("Empty");

  return (
    <DisplaySetting.Provider
      value={{
        initial,
      }}
    >
      {children}
    </DisplaySetting.Provider>
  );
};

export default DisplaySettingContextProvider;
