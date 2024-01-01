import React, {FC, ReactNode, createContext, useContext, useMemo} from 'react';
import type {IKyonMasterTextStyle} from '../interfaces';
import type {IKyonMasterInputStyle} from '../interfaces';

export interface ThemeContextValue {
  theme?: {
    KyonMasterText?: IKyonMasterTextStyle;
    KyonMasterInput?: IKyonMasterInputStyle;
  };
}

export const KyonThemeContext = createContext<ThemeContextValue>({});

export interface ThemeContextProvider {
  children: ReactNode | ReactNode[];
  theme?: {};
}

export const KyonThemeContextProvider: FC<ThemeContextProvider> = ({
  children,
  theme,
}) => {
  const value = useMemo(
    () => ({
      theme,
    }),
    [theme],
  );
  return (
    <KyonThemeContext.Provider value={value}>
      {children}
    </KyonThemeContext.Provider>
  );
};
export const useThemeContext = () =>
  useContext<ThemeContextValue>(KyonThemeContext);
