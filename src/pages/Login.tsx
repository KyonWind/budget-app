import { useKyonGoogleLogin } from "@kyon/hooks";
import { useBudgetFirebase } from "@context/BudgetFireBaseContext";
import { KyonMasterButton, KyonMasterView } from "@kyon/components";
import React, { useEffect, useState } from "react";
import { NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from "react-native";



export const Login = () => {

  const [resultData, setResultData] = useState();
  const [resultCode, setResultCode] = useState();

  const { onGoogleButtonPress } = useKyonGoogleLogin(
    "907797952601-k7uod4pcesda7dt7metuup7q6cb194s7.apps.googleusercontent.com"
  );
  const { existOnFirebase } = useBudgetFirebase();

  console.log("Login:resultData,resultCode",resultData,resultCode);
  const { TestModule } = NativeModules;

  const googleLogin = async () => {
     await onGoogleButtonPress();
    existOnFirebase();
  }

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      console.log("Login:requestPermissions",
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW);
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
        ]);

        if (granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissions granted');
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // For older versions, use the deprecated permissions
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        if (granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissions granted');
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestPermissions()
    const eventEmitter = new NativeEventEmitter(TestModule);
    const eventListener = eventEmitter.addListener('ScreenshotPermissionGranted', (event) => {
      setResultCode(event.resultCode)
      setResultData(event.resultData);
    });
    return () => {
      eventListener.remove();
    };
  }, [TestModule]);

  const test = async (event: any) => {
    try {
    const result = TestModule.startScreenshotService(event.resultCode, event.resultData);
      console.log("Login:test",result);
    } catch (error) {
      console.log("Login:error",error);
    }
  }


  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterButton title={'continuar con google'} onPress={( ) => googleLogin() }/>
     <KyonMasterButton title={'test'}  onPress={() => test() }/>
    </KyonMasterView>
  )
}
