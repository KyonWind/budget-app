import { useState } from "react";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { FormPago } from "@components/FormPago";
import { IPayments } from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";
import React from "react";


export const DetailPayment = ({route}: any) => {
  const [data, setData] = useState<IPayments>(route.params);
  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Editar Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
