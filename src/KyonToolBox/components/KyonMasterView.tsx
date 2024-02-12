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
    ?  //@ts-ignore
      theme?.KyonMasterView?.variants[variant]?.view
    : {};

  console.log('KyonMasterView:variant',variant);
  console.log('KyonMasterView:variantWrapper',variantWrapper);

  const themeView = theme?.KyonMasterView?.defaultProps?.view ?? {};

  const debugStyle: ViewStyle = debug
    ? {borderColor: 'red', borderWidth: 1}
    : {};

  const FlexDirection: ViewStyle = flexDirection
    ? {flexDirection: flexDirection}
    : {};

  const JustifyContent: ViewStyle = justifyContent
    ? {justifyContent: justifyContent}
    : {};

  const AlignItems: ViewStyle = alignItems
    ? {alignItems: alignItems}
    : {};


  const VIEW_STYLE: ViewStyle = {
    display: 'flex',
    alignSelf: 'center',
    ...debugStyle,
    ...themeView,
    ...wrapperStyle,
    ...variantWrapper,
    ...FlexDirection,
    ...JustifyContent,
    ...AlignItems,


  };

  return (
    <Animated.View style={VIEW_STYLE}>
      {children}
    </Animated.View>
  );
};
