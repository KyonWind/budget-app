import React, {useState} from 'react';
import {View} from 'react-native';
import {FormPago} from '../components/FormPago.tsx';
import {formInitialState} from '../const';

export interface IData {
  name: string;
  type: string;
  description: string;
  cost: string;
  url: string;
  paymentMethod: string;
}

export const Home = () => {
  const [data, setData] = useState<IData>(formInitialState);

  return (
    <View style={{padding: 15, width: '100%', height: '100%', display: 'flex'}}>
      <FormPago setData={setData} data={data} />
    </View>
  );
};
