import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const FooterMenu = () => {

  const navigation = useNavigation();

  return(
    <KyonMasterView variant={'container-row'} debug>
      <Pressable onPress={() => navigation.navigate('payment' as never) }>
      <KyonMasterText text={'Pagos'} debug/>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('home' as never) }>
      <KyonMasterText text={'Home'} debug/>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('cards' as never) }>
      <KyonMasterText text={'Tarjetas'} debug/>
      </Pressable>
    </KyonMasterView>
  )
}
