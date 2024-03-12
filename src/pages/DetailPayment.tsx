import React, { useEffect, useState } from "react";
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";
import { formInitialState } from "../const";
import { FormPago } from "../components/FormPago.tsx";

export interface IData {
  type: string;
  description: string;
  cost: string;
  url: string;
  paymentMethod: string;
  category: string;
}
export const DetailPayment = ({route}: any) => {
  const [data, setData] = useState<IData>(route.params);
console.log('%cDetailPayment:DetailPayment','color:yellow',data);
  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Editar Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
