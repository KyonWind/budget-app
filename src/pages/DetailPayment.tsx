import { useState } from "react";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { FormPago } from "@components/FormPago";
import {IGasto} from "@pages/Home.tsx";


export const DetailPayment = ({route}: any) => {
  const [data, setData] = useState<IGasto>(route.params);
  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Editar Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
