import type { TextStyle, ViewStyle } from 'react-native';
import { ReactNode } from "react";

export interface IKyonMasterText {
  textStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
  children?: ReactNode,
  text?: string;
  variant?: string;
  debug?: boolean;
}
