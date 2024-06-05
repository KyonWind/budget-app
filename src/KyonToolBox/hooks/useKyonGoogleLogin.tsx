import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useCallback, useEffect, useState } from "react";
import { useKyonAsyncStorageListener } from "./useKyonAsyncStorageListener.tsx";
import { useKyonRouterContext } from "../../context/KyonRouterContext.tsx";
import { useBudgetFirebase } from "../../context/BudgetFireBaseContext";
import { useBudgetProfileContext } from "../../context/BudgetProfileContext/BudgetProfileContext.tsx";
import React from "react";

export const useKyonGoogleLogin = ( webClientId?: string) => {

  const { setItem, getItem } = useKyonAsyncStorageListener();
  const { isLogged, setIsLogged } = useKyonRouterContext();
  const {setDebugComment} = useBudgetFirebase();
  const { getProfile } = useBudgetProfileContext();

   const onGoogleButtonPress = useCallback(async () => {
     try {
       GoogleSignin.configure({
         webClientId,
         scopes: ['profile','email']
       });
       const token = await getItem('token');
       if (token) {
         const googleCredential = auth.GoogleAuthProvider.credential(token);
         setDebugComment(prev => `${prev} \n ${googleCredential.toString()}`)
         const googledata = await auth().signInWithCredential(googleCredential);
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email,
           //@ts-ignore
           user: googledata?.user.email?.split('@')[0].replaceAll('.','')
         };
         await setItem('profile',JSON.stringify(profileData))
       } else {
         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
         const { idToken } = await GoogleSignin.signIn();
         await setItem('token', idToken);
         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
         const googledata = await auth().signInWithCredential(googleCredential);
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email,
           //@ts-ignore
           user: googledata?.user.email?.split('@')[0].replaceAll('.','')
         };
         setDebugComment(prev => `${prev} \n\n ${JSON.stringify(profileData)}`)
         await setItem('profile',JSON.stringify(profileData))
         getProfile();
       }
      return 'logged'

     } catch (e) {
       console.log('useKyonGoogleLogin:ERROR',e);
       //@ts-ignore
       throw new Error(e.message);
     }

  },[])

  const onInit = useCallback(async () =>{
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

  },[]);



  return { GoogleSignInButton, onGoogleButtonPress }

}
