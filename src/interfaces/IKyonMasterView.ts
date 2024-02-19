import type { ViewProps, ViewStyle } from "react-native";
import { ReactNode } from "react";

export interface IKyonMasterView extends ViewProps {
  wrapperStyle?: ViewStyle;
  debug?: boolean;
  variant?: string;
  children?: ReactNode | ReactNode[];
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  flexDirection?: 'row' | 'column';

}
