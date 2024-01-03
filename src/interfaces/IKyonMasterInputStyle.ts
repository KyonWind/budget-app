import type {ColorValue, TextInputProps, ViewStyle} from 'react-native';
import type {IKyonMasterTextStyle} from './IKyonMasterTextStyle';

export interface IKyonMasterInputStyle {
  defaultProps?: {
    input?: IkyonStyle;
    wrapper?: ViewStyle;
    label?: IKyonMasterTextStyle;
    basicInputConfigs?: IBasicConfig;
  };
  variants?: {
    [key: string]: {
      input?: TextInputProps;
      wrapper?: ViewStyle;
    };
  };
}

export interface IkyonStyle extends TextInputProps {
  borderWidth: number;
  borderColor: string;
  color: string;
}

export interface IBasicConfig {
  placeholderTextColor: ColorValue;
}
