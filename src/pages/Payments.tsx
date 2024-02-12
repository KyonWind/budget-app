import { useKyonGoogleLogin } from "../KyonToolBox/hooks/useKyonGoogleLogin.tsx";
import { ScrollView, View } from "react-native";
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterButton } from "../KyonToolBox/components/KyonMasterButton.tsx";
import { useBudgetFirebase } from "../context/BudgetFireBaseContext";
import { KyonMasterText } from "../KyonToolBox/components";

export const Payments = () => {

  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText text={'payments'} variant={'h1'}/>
    </KyonMasterView>
  )
}
