import { useKyonGoogleLogin } from "@kyon/hooks";
import { useBudgetFirebase } from "@context/BudgetFireBaseContext";
import { KyonMasterButton, KyonMasterView } from "@kyon/components";
import React from "react";
import {NativeModules} from 'react-native';



export const Login = () => {

  const { onGoogleButtonPress } = useKyonGoogleLogin(
    "907797952601-k7uod4pcesda7dt7metuup7q6cb194s7.apps.googleusercontent.com"
  );
  const { existOnFirebase } = useBudgetFirebase();

  console.log("Login:NativeModules",NativeModules);
  const { TestModule } = NativeModules;

  const googleLogin = async () => {
     await onGoogleButtonPress();
    existOnFirebase();
  }

  const test = () => {
    TestModule.TestModuleEvent('test', 'module', (response: any) => console.log(response));
  }


  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterButton title={'continuar con google'} onPress={( ) => googleLogin() }/>
     <KyonMasterButton title={'test'}  onPress={() => test() }/>
    </KyonMasterView>
  )
}
