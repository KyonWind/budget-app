import {
  Animated,
  Easing, Pressable,
  TextInput,
  View,
  ViewStyle
} from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import {useThemeContext} from '../../context';
import type { IKyonMasterInput } from "../../interfaces";
import {KyonMasterText} from './KyonMasterText.tsx';
import type {IKyonMasterText} from '../../interfaces';
import { KyonMasterModal } from "./KyonMasterModal.tsx";
import Image = Animated.Image;

export const KyonMasterInput = ({
  debug = false,
  noLabel = false,
  variant,
  inputStyle,
  wrapperStyle,
  labelStyle,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  label,
  placeholderTextColor,
  selectionColor,
  inputMode,
  type,
  options,
  footerOptions,
  headerOptions,
  rightIcon
}: IKyonMasterInput) => {
  const {theme} = useThemeContext();
  const LabelAnimated = useRef(new Animated.Value(25)).current;
  const LabelOpacityAnimated = useRef(new Animated.Value(0)).current;
  const [internalValue, setInternalValue] = useState(value);
  const [openModal, setOpenModal] = useState<boolean>(false);
 // const image = (rightIcon?.includes('http') ||
 // rightIcon?.includes('https')) ?  rightIcon : require(rightIcon as string);
//
 // console.log('%cKyonMasterInput:KyonMasterInput','color:yellow',image);
  const onFocus = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(LabelAnimated, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    Animated.timing(LabelOpacityAnimated, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressIn = () => {
      setOpenModal(true);
  }

  const onBlur = () => {
    if (!internalValue) {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.spring(LabelAnimated, {
        toValue: 25,
        useNativeDriver: true,
      }).start();
      Animated.spring(LabelOpacityAnimated, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const variantInput = variant
    ? // @ts-ignore
      theme?.KyonMasterInput?.variants[variant]?.text
    : {};

  const variantWrapper = variant
    ? // @ts-ignore
      theme?.KyonMasterInput?.variants[variant]?.wrapper
    : {};

  const themeText = theme?.KyonMasterInput?.defaultProps?.input ?? {};
  const themeWrapper = theme?.KyonMasterInput?.defaultProps?.wrapper ?? {};
  const themeLabel = theme?.KyonMasterInput?.defaultProps?.label ?? {};
  const themeBasicConfig =
    theme?.KyonMasterInput?.defaultProps?.basicInputConfigs ?? {};

  const debugStyle: ViewStyle = debug
    ? {borderColor: 'red', borderWidth: 1}
    : {};

  const INPUT_STYLE = {
    paddingLeft: 20,
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    marginTop: 5,
    ...themeText,
    ...inputStyle,
    ...variantInput,
  };

  const LABEL_STYLE: IKyonMasterText = {
    wrapperStyle: {
      width: '100%',
      //@ts-ignore
      opacity: LabelOpacityAnimated,
      //@ts-ignore
      transform: [{translateY: LabelAnimated}],
      ...themeLabel.defaultProps?.wrapper,
    },
    textStyle: {
      color: 'red',
      ...labelStyle?.textStyle,
      ...themeLabel.defaultProps?.text,
    },
  };

  const VIEW_STYLE: ViewStyle = {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    ...debugStyle,
    ...themeWrapper,
    ...wrapperStyle,
    ...variantWrapper,
  };

  const MODAL_STYLE: any = {
    position: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      width: '70%',
      height: '80%',
      backgroundColor: 'white',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    footer: {
      height: '15%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#63C6F4',
      width: '100%',
    },
    header: {
      height: '15%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#63C6F4',
      width: '100%',
    },
  };

  useEffect(() => {
    if (type === 'modal' && value) {
      setOpenModal(false);
    }
  }, [internalValue, value]);

  return (
    <View>
      <Animated.View style={VIEW_STYLE}>
        {!noLabel && (
          <KyonMasterText
            wrapperStyle={LABEL_STYLE?.wrapperStyle}
            textStyle={LABEL_STYLE?.textStyle}
            debug={debug}
            text={label}
          />
        )}
        { type !== 'modal' ? <View style={{
            flexDirection: 'row',
          }}>
          <TextInput
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          value={value}
          keyboardType={keyboardType}
          inputMode={inputMode}
          onChangeText={val => {
            onChangeText(val),
              setInternalValue(val);
          }}
          placeholderTextColor={
            //@ts-ignore
            themeBasicConfig.placeholderTextColor ?? placeholderTextColor
          }
          selectionColor={selectionColor}
          placeholder={placeholder}
          style={{ ...INPUT_STYLE, flex:1 }}
        />
          <Pressable onPress={()=> console.log('%cKyonMasterInput:','color:yellow','pressed')}>
            <Image
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                right: 10,
                top: 12}}
             // source={{ uri:'https://reactnative.dev/img/tiny_logo.png' }}
              source={rightIcon}
            />
          </Pressable>
          </View>
          :
         <Pressable style={VIEW_STYLE} onPressIn={onPressIn}>
          <TextInput
            value={value}
            editable={false}
            keyboardType={keyboardType}
            inputMode={inputMode}
            inlineImageLeft={'hola'}
            inlineImagePadding={30}
            placeholderTextColor={
              //@ts-ignore
              themeBasicConfig.placeholderTextColor ?? placeholderTextColor
            }
            selectionColor={selectionColor}
            placeholder={placeholder}
            style={INPUT_STYLE}
          />
        </Pressable>}
      </Animated.View>
    <KyonMasterModal options={options} open={openModal} close={()=> setOpenModal(!openModal)} footerOptions={footerOptions} headerTitle={label}/>
    </View>
  );
};
