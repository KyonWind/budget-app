import React, { FC, ReactNode, createContext, useContext, useMemo, useState, Dispatch, SetStateAction } from "react";

export interface KyonRouterContextValue {
  activeProfile: string|undefined;
  setActiveProfile: Dispatch<SetStateAction<string>>;
}

export const KyonRouterContext = createContext<KyonRouterContextValue>({
  activeProfile: '',
  setActiveProfile: () => ''
});

export interface KyonRouterContextProvider {
  children: ReactNode | ReactNode[];
}

export const KyonRouterContextProvider: FC<KyonRouterContextProvider> = ({ children }) => {

  const [activeProfile, setActiveProfile] = useState<string>('')

const value = useMemo(
  () => ({
  activeProfile,
  setActiveProfile,
}), [activeProfile,setActiveProfile]);
return (
  <KyonRouterContext.Provider value={value}>
    {children}
  </KyonRouterContext.Provider>
);
};
export const useKyonRouterContext = () => useContext<KyonRouterContextValue>(KyonRouterContext);
