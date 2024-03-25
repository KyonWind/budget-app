import { useState } from "react";
import { IData } from "@interface/IData.ts";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { FormPago } from "@components/FormPago.tsx";


export const DetailPayment = ({route}: any) => {
  const [data, setData] = useState<IData>(route.params);
  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Editar Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
