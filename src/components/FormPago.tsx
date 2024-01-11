import { KyonMasterInput, KyonMasterText } from "../KyonToolBox/components";
import {Button, Linking, Text, View} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {IAppLinks} from '../../App.tsx';
import {IData} from '../pages/Home.tsx';
import database from '@react-native-firebase/database';
import {formInitialState} from '../const';

interface IFormPago {
  setData: Dispatch<SetStateAction<any>>;
  data: IData;
}

const appsLinks: IAppLinks[] = [
  {
    name: 'Mercado Pago',
    url: 'market://details?id=com.mercadopago.wallet',
  },
  {
    name: 'MercadoLibre',
    url: 'market://details?id=com.mercadolibre',
  },
  {
    name: 'Galicia',
    url: 'market://details?id=com.mosync.app_Banco_Galicia',
  },
  {
    name: 'BBVA',
    url: 'market://details?id=com.bbva.nxt_argentina',
  },
  {
    name: 'HSBC',
    url: 'market://details?id=ar.com.hsbc.hsbcargentina',
  },
  {
    name: 'Tarjeta',
    url: '',
  },
  {
    name: 'Modo',
    url: '',
  },
];

export const FormPago = ({setData, data}: IFormPago) => {
  const [isPaid, setIsPaid] = useState(false);

  const [isDisabled, setIsDisable] = useState<boolean>(true);

  const validate = useCallback(() => {
    for (let item of Object.values(data)) {
      if (!item) {
        setIsDisable(true);
        break;
      } else {
        setIsDisable(false);
      }
    }
  }, [data]);

  useEffect(() => {
    validate();
  }, [data, validate]);

  useEffect(() => {
    if (isPaid) {
      setTimeout(() => {
        setIsPaid(false);
      }, 1000);
    }
  }, [isPaid]);

  const openApp = async () => {
    database().ref('/gastos').push({
      name: data.name,
      type: data.type,
      description: data.description,
      cost: data.cost,
      paymentMethod: data.paymentMethod,
      date: new Date().toLocaleDateString(),
    });
    if (data.url !== '') {
      Linking.openURL(data.url).catch(err => console.log('App:e', err));
    } else {
      setIsPaid(true);
    }
    setData(formInitialState);
    setIsPaid(true);
  };

  return (
    <View>
      <KyonMasterInput
        type={'select'}
        label={'miembro'}
        value={data.name}
        placeholder={'Sofi, Simon'}
        onChangeText={value =>
          setData((prev: IData) => ({
            ...prev,
            name: value,
          }))
        }
      />
      <KyonMasterInput
        type={'select'}
        placeholder={'importe'}
        inputMode={'decimal'}
        value={data.cost}
        onChangeText={value =>
          setData((prev: IData) => ({
            ...prev,
            cost: value,
          }))
        }
        label={'importe'}
      />
      <KyonMasterInput
        type={'select'}
        label={'descripcion'}
        value={data.description}
        placeholder={'descripcion'}
        onChangeText={value =>
          setData((prev: IData) => ({
            ...prev,
            description: value,
          }))
        }
      />
      <KyonMasterInput
        type={'select'}
        label={'tipo'}
        value={data.type}
        placeholder={'Visa, Efectivo , etc'}
        onChangeText={value =>
          setData((prev: IData) => ({
            ...prev,
            type: value,
          }))
        }
      />
      <KyonMasterInput
        type={'modal'}
        label={'metodo de pago'}
        placeholder={'metodo'}
        value={data.paymentMethod}
        options={appsLinks.map((app, index) => {
          return (
            <View key={index} style={{marginTop: 20}}>
              <Button
                title={app.name}
                onPress={() =>
                  setData((prev: IData) => ({
                    ...prev,
                    url: app.url || app.name,
                    paymentMethod: app.name,
                  }))
                }
              />
            </View>
          );
        })}
        onChangeText={value =>
          setData((prev: IData) => ({
            ...prev,
            paymentMethod: value,
          }))
        }
      />
      <Button disabled={isDisabled} title={'PAGAR'} onPress={() => openApp()} />

      <KyonMasterText textStyle={{color: '#d71c1c',fontSize: 40}} text={isPaid ? 'PAGADO' : ''} />
    </View>
  );
};
