import { useKyonGoogleLogin } from "../KyonToolBox/hooks/useKyonGoogleLogin.tsx";
import { ScrollView, View } from "react-native";
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterButton } from "../KyonToolBox/components/KyonMasterButton.tsx";
import { useBudgetFirebase } from "../context/BudgetFireBaseContext";
import { KyonMasterText } from "../KyonToolBox/components";

export const Login = () => {

  const { onGoogleButtonPress } = useKyonGoogleLogin(
    "907797952601-k7uod4pcesda7dt7metuup7q6cb194s7.apps.googleusercontent.com"
  );
  const { existOnFirebase } = useBudgetFirebase()
  const { debugComment} = useBudgetFirebase();

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
