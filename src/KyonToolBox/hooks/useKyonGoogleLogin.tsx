import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useCallback, useEffect, useState } from "react";
import { useKyonAsyncStorageListener } from "./useKyonAsyncStorageListener.tsx";
import { useKyonRouterContext } from "../../context/KyonRouterContext.tsx";



export const useKyonGoogleLogin = ( webClientId?: string) => {

  const { setItem, getItem } = useKyonAsyncStorageListener();
  const { isLogged, setIsLogged} = useKyonRouterContext()
   const onGoogleButtonPress = useCallback(async () => {
     try {
       GoogleSignin.configure({
         webClientId,
         scopes: ['profile','email']
       });
      console.log('useKyonGoogleLogin:configured');
       const token = await getItem('token');
       if (token) {
         console.log('useKyonGoogleLogin:tokenFlow');
         const googleCredential = auth.GoogleAuthProvider.credential(token);
         console.log('useKyonGoogleLogin:gotCredentials');
         const googledata = await auth().signInWithCredential(googleCredential);
         console.log('useKyonGoogleLogin:gotData');
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email
         };
         await setItem('profile',JSON.stringify(profileData))
         console.log('useKyonGoogleLogin:dataSaved');
         setIsLogged(true);
         console.log('useKyonGoogleLogin:logged');
       } else {
         console.log('useKyonGoogleLogin:noTokenFlow');
         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
         const { idToken } = await GoogleSignin.signIn();
         console.log('useKyonGoogleLogin:gotToken');
         await setItem('token', idToken);
         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
         console.log('useKyonGoogleLogin:gotCredentials');
         const googledata = await auth().signInWithCredential(googleCredential);
         console.log('useKyonGoogleLogin:gotData');
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email
         };
         await setItem('profile',JSON.stringify(profileData))
         setIsLogged(true);
         console.log('useKyonGoogleLogin:logged');
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
          onPress={() => onGoogleButtonPress()}
        />
      )

  },[isLogged]);



  return { GoogleSignInButton, isLogged }

}
