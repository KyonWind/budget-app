import { useKyonGoogleLogin } from "@kyon/hooks";
import { useBudgetFirebase } from "@context/BudgetFireBaseContext";
import { KyonMasterButton, KyonMasterView } from "@kyon/components";


export const Login = () => {

  const { onGoogleButtonPress } = useKyonGoogleLogin(
    "907797952601-k7uod4pcesda7dt7metuup7q6cb194s7.apps.googleusercontent.com"
  );
  const { existOnFirebase } = useBudgetFirebase()

  const googleLogin = async () => {
    const result = await onGoogleButtonPress();
    existOnFirebase();
  }


  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterButton title={'continuar con google'} onPress={( ) => googleLogin() }/>
     {/* <ScrollView>
      <KyonMasterText text={debugComment}/>
      </ScrollView>*/}
    </KyonMasterView>
  )
}
