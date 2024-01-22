import {Animated, Text, ViewStyle} from 'react-native';
import React from 'react';
import {useThemeContext} from '../../context';
import type {IKyonMasterText} from '../../interfaces';
import { IKyonMasterView } from "../../interfaces/IKyonMasterView.ts";

export const KyonMasterView = ({
  wrapperStyle,
  variant,
  debug = false,
  children,
  justifyContent,
  alignItems,
  flexDirection
}: IKyonMasterView) => {

  const {theme} = useThemeContext();

  const variantWrapper = variant
    ? // @ts-ignore
      theme?.KyonMasterView?.variants[variant]?.view
    : {};


  const themeView = theme?.KyonMasterView?.defaultProps?.view ?? {};

  const debugStyle: ViewStyle = debug
    ? {borderColor: 'red', borderWidth: 1}
    : {};

  const VIEW_STYLE: ViewStyle = {
    display: 'flex',
    alignSelf: 'center',
    ...debugStyle,
    ...themeView,
    ...wrapperStyle,
    ...variantWrapper,
    justifyContent,
    alignItems,
    flexDirection
  };

  return (
    <Animated.View style={VIEW_STYLE}>
      {children}
    </Animated.View>
  );
};
