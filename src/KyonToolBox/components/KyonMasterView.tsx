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
  flexDirection,
  onMagicTap,
}: IKyonMasterView) => {

  const {theme} = useThemeContext();

  const variantWrapper = variant
    ?  //@ts-ignore
      theme?.KyonMasterView?.variants[variant]?.view
    : {};

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
    ...variantWrapper,
    ...FlexDirection,
    ...JustifyContent,
    ...AlignItems,
    ...wrapperStyle,


  };

  return (
    <Animated.View onMagicTap={onMagicTap} style={VIEW_STYLE}>
      {children}
    </Animated.View>
  );
};
