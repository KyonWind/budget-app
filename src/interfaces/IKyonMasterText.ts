import type { TextStyle, ViewStyle } from 'react-native';

export interface IKyonMasterText {
  textStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
  text?: string;
  variant?: string;
  debug?: boolean;
}
