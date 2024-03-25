import {
  IKyonMasterButtonStyle,
  IKyonMasterInputStyle,
  IKyonMasterTextStyle,
  IKyonMasterViewStyle
} from "@interfaces";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";


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
