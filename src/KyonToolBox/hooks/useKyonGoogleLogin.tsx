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
       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
       // Get the users ID token
       const { idToken } = await GoogleSignin.signIn();
      console.log('useKyonGoogleLogin:idToken',idToken);
       await setItem('token', idToken);

       // Create a Google credential with the  token
       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

       // Sign-in the user with the credential
       const googledata = await auth().signInWithCredential(googleCredential);
       console.log('useKyonGoogleLogin:',googledata);
       const profileData = {
         name: googledata.additionalUserInfo?.profile?.given_name,
         email: googledata.user.email
       };
       console.log('useKyonGoogleLogin:profileData',profileData);
       await setItem('profile',JSON.stringify(profileData))
       setIsLogged(true);
     } catch (e) {
       //@ts-ignore
       console.log('useKyonGoogleLogin:ERROR',e);
     }
    // Check if your device supports Google Play

  },[])

  const onInit = useCallback(async () =>{
    if(await getItem("token")) {
      setIsLogged(true);
    }
  },[])

  useEffect(() => {
    console.log('useKyonGoogleLogin:');
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
