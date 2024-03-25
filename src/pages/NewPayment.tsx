import { useState } from "react";
import { IData } from "@root/interfaces";
import { formInitialState } from "@root/const";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { FormPago } from "@root/components";


export const NewPayment = () => {
  const [data, setData] = useState<IData>(formInitialState);

  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Nuevo Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
