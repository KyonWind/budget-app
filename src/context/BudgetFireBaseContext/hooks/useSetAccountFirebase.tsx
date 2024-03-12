import database from "@react-native-firebase/database";
import { useKyonAsyncStorageListener } from "../../../KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { Dispatch, SetStateAction } from "react";
import { useKyonRouterContext } from "../../KyonRouterContext.tsx";


interface IProfile {
  user: string
}
export const useSetAccountFirebase = (setDebugComment: Dispatch<SetStateAction<string|undefined>>) => {

  const { getItem } = useKyonAsyncStorageListener();
  const { setIsLogged} = useKyonRouterContext();

  const existOnFirebase = async () => {
    let profile : { user: string } | null = JSON.parse(await getItem('profile') as string);
    if (profile) {
    let fireBaseAcc = await database().ref(`/users/${profile.user}`).once('value');
      setDebugComment(prev => `${prev} \n\n ${JSON.stringify(fireBaseAcc)}`)
      if(!fireBaseAcc.exists()) {
        await createDataOnDatabase(profile);
        setIsLogged(true);
      } else {
        setDebugComment(prev => `${prev} \n\n exist in Account`)
       setIsLogged(true);
      }
    }
  }

  const createDataOnDatabase = async (profile: IProfile) => {
    console.log('createDataOnDatabase:... creating');
    setDebugComment(prev => `${prev} \n\n 'createDataOnDatabase:... creating'`)
    const result = await database().ref(`/users/${profile?.user}`).set({
      name: profile?.user
    });
    setDebugComment(prev => `${prev} \n\n result:${JSON.stringify(result)}`)
    const addPayment = database().ref(`/users/${profile?.user}/paymentMethods`).push({
      name: 'Efectivo'
    });
    setDebugComment(prev => `${prev} \n\n addPayment:${JSON.stringify(addPayment)}`)
    setIsLogged(true);
  }

  return {existOnFirebase}
}
