import { Animated } from "react-native";
import View = Animated.View;
import { KyonMasterText } from "@kyon/components";
import React from "react";


export const Loading = () => {

  return (
    <View style={{backgroundColor:'white'}}>
      <KyonMasterText text={'LOADING'}/>
    </View>
  )

}
