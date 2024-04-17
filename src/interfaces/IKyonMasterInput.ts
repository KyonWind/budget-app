import type {TextInputProps, ViewStyle} from 'react-native';
import type {IKyonMasterText} from './IKyonMasterText';

// @ts-ignore
export interface IKyonMasterInput extends TextInputProps {
  inputStyle?: TextInputProps;
  wrapperStyle?: ViewStyle;
  placeholder?: string;
  labelStyle?: IKyonMasterText;
  onChangeText: (value: string) => void;
  type: 'select' | 'modal';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  value?: string | number;
  label: string;
  noLabel?: boolean;
  variant?: string;
  debug?: boolean;
  placeholderTextColor?: string;
  selectionColor?: string;
  options?: any[];
  footerOptions?: any[];
  headerOptions?: any[];
  rightIcon?: string;
}
