import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useCallback, useEffect, useState } from "react";
import { useKyonAsyncStorageListener } from "./useKyonAsyncStorageListener.tsx";
import { useKyonRouterContext } from "../../context/KyonRouterContext.tsx";
import { KyonMasterText } from "../components";



export const useKyonGoogleLogin = ( webClientId?: string) => {

  const { setItem, getItem } = useKyonAsyncStorageListener();
  const { isLogged, setIsLogged} = useKyonRouterContext()
   const onGoogleButtonPress = useCallback(async () => {
     try {
       GoogleSignin.configure({
         webClientId,
         scopes: ['profile','email']
       });
       const token = await getItem('token');
       if (token) {
         const googleCredential = auth.GoogleAuthProvider.credential(token);
         const googledata = await auth().signInWithCredential(googleCredential);
         console.log('useKyonGoogleLogin:googledata',googledata?.user.email.replace('.',''));
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email,
           //@ts-ignore
           user: googledata?.user.email.replace('.','')
         };
         await setItem('profile',JSON.stringify(profileData))
         setIsLogged(true);
       } else {
         console.log('useKyonGoogleLogin:noTokenFlow');
         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
         const { idToken } = await GoogleSignin.signIn();
         await setItem('token', idToken);
         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
         const googledata = await auth().signInWithCredential(googleCredential);
         console.log('useKyonGoogleLogin:googledata',googledata?.user.email.replace('.',''));
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email,
           //@ts-ignore
           user: googledata?.user.email.replace('.','')
         };
         await setItem('profile',JSON.stringify(profileData))
         setIsLogged(true);
       }


     } catch (e) {
       //@ts-ignore
       console.log('useKyonGoogleLogin:ERROR',e);
     }
    // Check if your device supports Google Play

  },[])

  const onInit = useCallback(async () =>{
    console.log('useKyonGoogleLogin:onInit',isLogged);
    const token = await getItem("token");
    if(token) {
      setIsLogged(true);
    }
  },[isLogged])

  useEffect(() => {
    onInit()
  }, [isLogged]);

    const GoogleSignInButton =  useCallback(() => {
      return (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => onGoogleButtonPress()}
          style={{width: '100%'}}
        />

      )

  },[isLogged]);



  return { GoogleSignInButton, isLogged }

}
