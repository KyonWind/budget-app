import React, {FC, ReactNode, createContext, useContext, useMemo} from 'react';
import type {IKyonMasterTextStyle} from '../interfaces';
import type {IKyonMasterInputStyle} from '../interfaces';
import { IKyonMasterViewStyle } from "../interfaces/IKyonMasterViewStyle.ts";
import { IKyonMasterButtonStyle } from "../interfaces/IKyonMasterButtonStyle.ts";

export interface ThemeContextValue {
  theme?: {
    KyonMasterView?: IKyonMasterViewStyle;
    KyonMasterText?: IKyonMasterTextStyle;
    KyonMasterInput?: IKyonMasterInputStyle;
    KyonMasterButton?: IKyonMasterButtonStyle;
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
