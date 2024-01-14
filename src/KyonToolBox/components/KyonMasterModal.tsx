import {
  Alert,
  Animated,
  Button,
  Easing,
  Modal, Pressable,
  ScrollView,
  TextInput,
  View,
  ViewStyle
} from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import {useThemeContext} from '../../context';
import type { IKyonMasterInput, IKyonMasterTextStyle } from "../../interfaces";
import {KyonMasterText} from './KyonMasterText.tsx';
import type {IKyonMasterText} from '../../interfaces';
import { KyonMasterView } from "./KyonMasterView.tsx";
import { IKyonMasterModal } from "../../interfaces/IKyonMasterModal.ts";
import { KyonMasterButton } from "./KyonMasterButton.tsx";

export const KyonMasterModal = ({
                                  options,
                                  footerOptions,
                                  headerTitle,
                                  open,
                                  close
                                }: IKyonMasterModal) => {

  const MODAL_BACKGROUND: ViewStyle = {
    position: 'absolute', /* Stay in place */
    zIndex: 1, /* Sit on top */
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%', /* Full width */
    height: "100%", /* Full height */
    backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
  }

  const MODAL_CONTENT: ViewStyle = {
    display: 'flex', /* Stay in place */
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '80%', /* Full width */
    height: "80%", /* Full height */
    backgroundColor: 'white', /* Black w/ opacity */
    borderRadius: 15,
  }

  const MODAL_HEADER: ViewStyle = {
    display: 'flex', /* Stay in place */
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    backgroundColor: 'white', /* Black w/ opacity */
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  }

  const MODAL_BODY: ViewStyle = {
    display: 'flex',
    padding: 15,
    backgroundColor: 'white',
  }

  const MODAL_FOOTER: ViewStyle = {
    width :'100%',
    display: 'flex',
    padding: 15,
    borderTopWidth: 2,
    borderTopColor: 'blue',
    backgroundColor: 'white',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        close()
      }}>
      <KyonMasterView wrapperStyle={MODAL_BACKGROUND}>
        <KyonMasterView wrapperStyle={MODAL_CONTENT}>
          <KyonMasterView wrapperStyle={MODAL_HEADER}>
            <KyonMasterText textStyle={{fontSize: 25}} text={headerTitle} />
          </KyonMasterView>
          <ScrollView style={MODAL_BODY} >{options}</ScrollView>
          <KyonMasterView wrapperStyle={MODAL_FOOTER}>
            {footerOptions}
            <KyonMasterButton
              onPress={() => close()}
              variant={'close'}
              title={'Cerrar'}
            />
          </KyonMasterView>
        </KyonMasterView>
      </KyonMasterView>
    </Modal>
  );
};
