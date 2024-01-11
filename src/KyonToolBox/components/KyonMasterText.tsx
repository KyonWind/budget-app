import {Animated, Text, ViewStyle} from 'react-native';
import React from 'react';
import {useThemeContext} from '../../context';
import type {IKyonMasterText} from '../../interfaces';

export const KyonMasterText = ({
  textStyle,
  wrapperStyle,
  text,
  variant,
  debug = false,
}: IKyonMasterText) => {
  const {theme} = useThemeContext();

  const variantText = variant
    ? // @ts-ignore
      theme?.MasterText?.variants[variant]?.text
    : {};

  const variantWrapper = variant
    ? // @ts-ignore
      theme?.MasterText?.variants[variant]?.wrapper
    : {};

  const themeText = theme?.KyonMasterText?.defaultProps?.text ?? {};

  const themeWrapper = theme?.KyonMasterText?.defaultProps?.wrapper ?? {};

  const debugStyle: ViewStyle = debug
    ? {borderColor: 'red', borderWidth: 1}
    : {};

  const TEXT_STYLE = {
    ...themeText,
    ...textStyle,
    ...variantText,
  };

  const VIEW_STYLE: ViewStyle = {
    display: 'flex',
    alignSelf: 'center',
    ...debugStyle,
    ...themeWrapper,
    ...wrapperStyle,
    ...variantWrapper,
  };

  return (
    <Animated.View style={VIEW_STYLE}>
      <Text style={TEXT_STYLE}>{text}</Text>
    </Animated.View>
  );
};
