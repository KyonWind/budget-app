import { useNavigation } from "@react-navigation/native";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { Pressable } from "react-native";
import React from "react";


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
