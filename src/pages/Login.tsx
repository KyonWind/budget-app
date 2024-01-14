import { useKyonGoogleLogin } from "../KyonToolBox/hooks/useKyonGoogleLogin.tsx";
import { View } from "react-native";
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";

export const Login = () => {

  const {GoogleSignInButton} = useKyonGoogleLogin(
    "907797952601-k7uod4pcesda7dt7metuup7q6cb194s7.apps.googleusercontent.com"
  );

  return (
    <KyonMasterView variant={'background'}>
      <GoogleSignInButton/>
    </KyonMasterView>
  )

}
