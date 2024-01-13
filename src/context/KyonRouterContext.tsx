import React, { FC, ReactNode, createContext, useContext, useMemo, useState, Dispatch, SetStateAction } from "react";

export interface KyonRouterContextValue {
  activeProfile: string|undefined;
  setActiveProfile: Dispatch<SetStateAction<string>>;
  isLogged : boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const KyonRouterContext = createContext<KyonRouterContextValue>({
  activeProfile: '',
  setActiveProfile: () => '',
  isLogged : false,
  setIsLogged: () => ''
});

export interface KyonRouterContextProvider {
  children: ReactNode | ReactNode[];
}

export const KyonRouterContextProvider: FC<KyonRouterContextProvider> = ({ children }) => {

  const [activeProfile, setActiveProfile] = useState<string>('')
  const [isLogged, setIsLogged] = useState<boolean>(false);

const value = useMemo(
  () => ({
  activeProfile,
  setActiveProfile,
  isLogged,
  setIsLogged
}), [activeProfile,setActiveProfile,isLogged,setIsLogged]);
return (
  <KyonRouterContext.Provider value={value}>
    {children}
  </KyonRouterContext.Provider>
);
};
export const useKyonRouterContext = () => useContext<KyonRouterContextValue>(KyonRouterContext);
