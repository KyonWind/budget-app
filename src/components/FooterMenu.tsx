import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const FooterMenu = () => {

  const navigation = useNavigation();

  return(
    <KyonMasterView variant={'menu'}>
      <Pressable onPress={() => navigation.navigate('payment' as never) }>
      <KyonMasterText text={'Pagos'}/>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('home' as never) }>
      <KyonMasterText text={'Home'}/>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('cards' as never) }>
      <KyonMasterText text={'Metodo'}/>
      </Pressable>
    </KyonMasterView>
  )
}
