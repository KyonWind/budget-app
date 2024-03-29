import { useState } from "react";
import { IData } from "@root/interfaces";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { FormPago } from "@root/components";


export const DetailPayment = ({route}: any) => {
  const [data, setData] = useState<IData>(route.params);
  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Editar Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
