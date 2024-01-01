import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type {IKyonMasterTextStyle} from './IKyonMasterTextStyle';

export interface IKyonMasterInputStyle {
  defaultProps?: {
    input?: StyleProp<TextStyle>;
    wrapper?: ViewStyle;
    label?: IKyonMasterTextStyle;
  };
  variants?: {
    [key: string]: {
      input?: StyleProp<TextStyle>;
      wrapper: ViewStyle;
      label?: IKyonMasterTextStyle;
    };
  };
}
