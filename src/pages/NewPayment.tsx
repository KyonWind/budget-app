import { useState } from "react";
import { IData } from "@interface/IData.ts";
import { formInitialState } from "@const/initialStates.ts";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { FormPago } from "@components/FormPago.tsx";
import React from "react";
import { IPayments } from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";


export const NewPayment = () => {
  const [data, setData] = useState<IPayments>(formInitialState);

  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Nuevo Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
