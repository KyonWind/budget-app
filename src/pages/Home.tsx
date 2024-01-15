import React, {useState} from 'react';
import { ScrollView, View } from "react-native";
import {FormPago} from '../components/FormPago.tsx';
import {formInitialState} from '../const';
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";
import { useBudgetFirebase } from "../context/BudgetFireBaseContext";

export interface IData {
  type: string;
  description: string;
  cost: string;
  url: string;
  paymentMethod: string;
}

export const Home = () => {
  const [data, setData] = useState<IData>(formInitialState);
  //const { debugComment} = useBudgetFirebase();

  //console.log('Home:Home',debugComment);

  return (
    <KyonMasterView variant={'background'}>
      <FormPago setData={setData} data={data} />
    {/*  <ScrollView>
        <KyonMasterText text={debugComment}/>
      </ScrollView>*/}
    </KyonMasterView>
  );
};
