import { useKyonGoogleLogin } from "../KyonToolBox/hooks/useKyonGoogleLogin.tsx";
import { View } from "react-native";
import { KyonMasterText } from "../KyonToolBox/components";

export const Loading = () => {

  return (
    <View style={{backgroundColor:'white'}}>
      <KyonMasterText text={'LOADING'}/>
    </View>
  )

}
