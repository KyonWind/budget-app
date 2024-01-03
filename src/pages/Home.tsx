import React, {useEffect, useState} from 'react';
import {Button, Linking, Text, View} from 'react-native';
import {IAppLinks} from '../../App.tsx';
import database from '@react-native-firebase/database';
import {KyonMasterInput} from '../components';

export const Home = () => {
  const [data, setData] = useState({
    name: '',
    type: '',
    description: '',
    cost: '',
    url: '',
    paymentMethod: '',
  });
  const [isPaid, setIsPaid] = useState(false);

  console.log('Home:date', new Date().toLocaleDateString());

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
  };

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

  useEffect(() => {
    if (isPaid) {
      setTimeout(() => {
        setIsPaid(false);
      }, 1000);
    }
  }, [isPaid]);

  console.log('Home:Home', data.cost);

  return (
    <View style={{padding: 15, width: '100%', height: '100%', display: 'flex'}}>
      <KyonMasterInput
        type={'select'}
        label={'miembro'}
        placeholder={'Sofi, Simon'}
        onChangeText={value =>
          setData(prev => ({
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
          setData(prev => ({
            ...prev,
            cost: value,
          }))
        }
        label={'importe'}
      />
      <KyonMasterInput
        type={'select'}
        label={'descripcion'}
        placeholder={'descripcion'}
        onChangeText={value =>
          setData(prev => ({
            ...prev,
            description: value,
          }))
        }
      />
      <KyonMasterInput
        type={'select'}
        label={'tipo'}
        placeholder={'Visa, Efectivo , etc'}
        onChangeText={value =>
          setData(prev => ({
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
                  setData(prev => ({
                    ...prev,
                    url: app.url,
                    paymentMethod: app.name,
                  }))
                }
              />
            </View>
          );
        })}
        onChangeText={value =>
          setData(prev => ({
            ...prev,
            paymentMethod: value,
          }))
        }
      />
      <Button title={'PAGAR'} onPress={() => openApp()} />
      <Text>{isPaid ? 'PAGADO' : ''}</Text>
    </View>
  );
};
