import type { TextStyle, ViewStyle } from 'react-native';

export interface IKyonMasterTextStyle {
  defaultProps?: {
    text?: TextStyle;
    wrapper?: ViewStyle;
  };
  variants?: {
    [key: string]: {
      text?: TextStyle;
      wrapper?: ViewStyle;
    };
  };
}
