import { Animated, Button, Pressable, ViewStyle } from "react-native";
import React from 'react';
import {useThemeContext} from '../../context';
import { IKyonMasterButton } from "../../interfaces/IKyonMasterButton.ts";
import { KyonMasterText } from "./KyonMasterText.tsx";

export const KyonMasterButton = ({
  buttonStyle,
  wrapperStyle,
  variant,
  debug = false,
  onPress,
  disabled,
  title
}: IKyonMasterButton) => {
  const {theme} = useThemeContext();

  const variantText = variant
    ? // @ts-ignore
      theme?.KyonMasterButton?.variants[variant]?.text
    : {};

  const variantWrapper = variant
    ? // @ts-ignore
      theme?.KyonMasterButton?.variants[variant]?.wrapper
    : {};

  console.log('KyonMasterButton:variant',variant);
  console.log('KyonMasterButton:variantWrapper',variantWrapper);

  const themeButton = theme?.KyonMasterButton?.defaultProps?.button ?? {};

  const themeWrapper = theme?.KyonMasterButton?.defaultProps?.wrapper ?? {};
  const themeText = theme?.KyonMasterButton?.defaultProps?.text ?? {};


  const debugStyle: ViewStyle = debug
    ? {borderColor: 'red', borderWidth: 1}
    : {};

  const disableStyle: ViewStyle = disabled
    ? {backgroundColor: 'gray'}
    : {};

  const BUTTON_STYLE = {
    ...themeButton,
    ...buttonStyle,
    ...variantText,
  };

  const VIEW_STYLE: ViewStyle = {
    display: 'flex',
    alignSelf: 'center',
    ...debugStyle,
    ...themeWrapper,
    ...wrapperStyle,
    ...variantWrapper,
    ...disableStyle
  };

  const TEXT_STYLE = {
    ...themeText,
    ...variantText,
  };

  return (
    <Animated.View style={VIEW_STYLE}>
      <Pressable disabled={disabled} onPress={onPress} >
        <KyonMasterText textStyle={TEXT_STYLE} wrapperStyle={{padding:0}} text={title.toUpperCase()}/>
      </Pressable>
    </Animated.View>
  );
}
