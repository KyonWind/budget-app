import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useCallback, useEffect, useState } from "react";
import { useKyonAsyncStorageListener } from "./useKyonAsyncStorageListener.tsx";



export const useKyonGoogleLogin = ( webClientId?: string) => {

  const { setItem, getItem } = useKyonAsyncStorageListener();
  const [isLogged, setIsLogged] = useState<boolean>(false);

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
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email
         };
         await setItem('profile',JSON.stringify(profileData))
         setIsLogged(true);
       } else {
         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
         const { idToken } = await GoogleSignin.signIn();
         await setItem('token', idToken);
         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
         const googledata = await auth().signInWithCredential(googleCredential);
         const profileData = {
           name: googledata.additionalUserInfo?.profile?.given_name,
           email: googledata.user.email
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
    const token = await getItem("token");
    if(token) {
      setIsLogged(true);
    }
  },[isLogged, setIsLogged])

  useEffect(() => {
    onInit()
  }, [isLogged]);

    const GoogleSignInButton =  useCallback(() => {
      return (
        <GoogleSigninButton
          onPress={() => onGoogleButtonPress()}
        />
      )

  },[]);



  return { GoogleSignInButton, isLogged }

}
