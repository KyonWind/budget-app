import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {FormPago} from '../components/FormPago.tsx';
import {formInitialState} from '../const';
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";
import { useBudgetFirebase } from "../context/BudgetFireBaseContext";
import database from "@react-native-firebase/database";
import { useKyonAsyncStorageListener } from "../KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { KyonMasterButton } from "../KyonToolBox/components/KyonMasterButton.tsx";

export interface IData {
  type: string;
  description: string;
  cost: string;
  url: string;
  paymentMethod: string;
  category: string;
}
export const NewPayment = () => {
  const [data, setData] = useState<IData>(formInitialState);

  return (
    <KyonMasterView variant={'background'}>
      <KyonMasterText variant={'h1'} text={'Nuevo Pago'}/>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
