import { createContext } from "react";

export const DisplaySetting = createContext({
  initial: [],
});

const DisplaySettingContextProvider = ({ children }) => {


  return (
    <DisplaySetting.Provider
      value={{
        initial
      }}
    >
      {children}
    </DisplaySetting.Provider>
  );
};

export default DisplaySettingContextProvider;