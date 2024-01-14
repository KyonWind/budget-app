import type { ButtonProps, TextStyle, ViewStyle } from "react-native";
import { ReactNode } from "react";

export interface IKyonMasterButton extends ButtonProps {
  buttonStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
  children?: ReactNode,
  variant?: string;
  debug?: boolean;
}
