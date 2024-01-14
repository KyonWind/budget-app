import type { TextStyle, ViewStyle } from 'react-native';

export interface IKyonMasterButtonStyle {
  defaultProps?: {
    button?: TextStyle;
    wrapper?: ViewStyle;
    text?: TextStyle
  };
  variants?: {
    [key: string]: {
      button?: TextStyle;
      wrapper?: ViewStyle;
      text?: TextStyle
    };
  };
}
