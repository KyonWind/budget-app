import React, {useState} from 'react';
import {View} from 'react-native';
import {FormPago} from '../components/FormPago.tsx';
import {formInitialState} from '../const';
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";

export interface IData {
  type: string;
  description: string;
  cost: string;
  url: string;
  paymentMethod: string;
}

export const Home = () => {
  const [data, setData] = useState<IData>(formInitialState);

  return (
    <KyonMasterView variant={'background'}>
      <FormPago setData={setData} data={data} />
    </KyonMasterView>
  );
};
