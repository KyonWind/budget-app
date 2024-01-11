/*
import messaging from '@react-native-firebase/messaging';
import {useCallback, useEffect, useMemo} from 'react';
import {useSaveDeviceToken} from '../services/useSaveDeviceToken';
import ModalController from '../controller/ModalController';
import {Platform} from 'react-native';
import { useAsyncStorageListener } from "./useKyonAsyncStorageListener.tsx";

export const useNotificationListener = () => {
  const {call: saveDeviceToken} = useSaveDeviceToken({}, {autoCall: false});
  const {setItem} = useAsyncStorageListener();

  const getToken = useCallback(async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      const FCMToken = await messaging().getToken();
      console.log('token', FCMToken);
      await saveDeviceToken({
        device_token: FCMToken,
        app_name: `theravi_paciente_${Platform.OS}`,
      });
    } catch (e) {
      //ModalController.showModal({type: 'error', message: 'device token'});
      console.log('Error:', e);
    }
  }, [saveDeviceToken]);

  const getConfigureHandler = useCallback(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      await messaging().sendMessage(remoteMessage);
    });
    messaging().onMessage(async (remoteMessage: { notification: { body: any; title: any; }; data: any; messageId: any; }) => {
      ModalController.showModal({type: 'notification', body: remoteMessage.notification?.body, title: remoteMessage.notification?.title});
      if (remoteMessage.data) {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        await setItem(
          'notification',
          JSON.stringify({
            [remoteMessage.messageId]: {
              ...remoteMessage.data,
              readed: false,
            },
          }),
        );
      }
    });
    const topicSubcribed = messaging().subscribeToTopic('global');
    return topicSubcribed;
  }, [setItem]);

  useEffect(() => {
    getConfigureHandler();
    //return () => topicSubcribed;
  }, [getConfigureHandler, setItem]);

  return useMemo(
    () => ({
      getToken: () => getToken(),
    }),
    [getToken],
  );
};
*/
