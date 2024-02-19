import React, { useEffect, useState } from "react";
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";

export interface IData {
  type: string;
  description: string;
  cost: string;
  url: string;
  paymentMethod: string;
  category: string;
}
export const DetailPayment = ({route}: any) => {

  useEffect(() => {
  }, []);

  return (
    <KyonMasterView alignItems={'flex-start'} justifyContent={'flex-start'} variant={'background'}>
      {Object.keys(route.params).map(key => {
        return (
          <KyonMasterView key={key} flexDirection={'row'} wrapperStyle={{width:'100%'}}>
            <KyonMasterText text={`${key.toUpperCase()}: `} textStyle={{fontWeight:'bold', fontSize:20}}/>
            <KyonMasterText text={route.params[key]} textStyle={{fontSize:15}}/>
          </KyonMasterView>
        )
      })
      }
    </KyonMasterView>
  );
};
