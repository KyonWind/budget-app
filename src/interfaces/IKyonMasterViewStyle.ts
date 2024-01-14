
import type {ViewStyle } from 'react-native';

export interface IKyonMasterViewStyle {
  defaultProps?: {
    view?: ViewStyle;
  };
  variants?: {
    [key: string]: {
      view?: ViewStyle;
    };
  };
}
