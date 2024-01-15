import database from "@react-native-firebase/database";
import { useKyonAsyncStorageListener } from "../../../KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { useEffect, useState } from "react";
import { set } from "@react-native-firebase/database/lib/modular/query";
import { useKyonRouterContext } from "../../KyonRouterContext.tsx";


interface IProfile {
  user: string
}
export const useSetAccountFirebase = () => {

  const { getItem } = useKyonAsyncStorageListener();
  const { setIsLogged} = useKyonRouterContext();

  const existOnFirebase = async () => {
    let profile : { user: string } | null = JSON.parse(await getItem('profile') as string);
    console.log('useSetAccountFirebase:existOnFirebase',profile);
    if (profile) {
    let fireBaseAcc = await database().ref(`/users/${profile.user}`).once('value');

      console.log('useSetAccountFirebase:fireBaseAcc', fireBaseAcc);
      if(!fireBaseAcc.exists()) {
        await createDataOnDatabase(profile);
        setIsLogged(true);
      } else {
       setIsLogged(true);
      }
    }
  }

  const createDataOnDatabase = async (profile: IProfile) => {
    console.log('createDataOnDatabase:... creating');
    await database().ref(`/users/${profile?.user}`).set({
      name: profile?.user
    });
    database().ref(`/users/${profile?.user}/paymentMethods`).push({
      name: 'Efectivo'
    });
    setIsLogged(true);
  }

  return {existOnFirebase}
}
