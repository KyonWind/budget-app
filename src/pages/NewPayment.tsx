import { useState } from "react";
import { IData } from "@interface/IData.ts";
import { formInitialState } from "@const/initialStates.ts";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { FormPago } from "@components/FormPago.tsx";


export const NewPayment = () => {
  const [data, setData] = useState<IData>(formInitialState);

  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Nuevo Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
