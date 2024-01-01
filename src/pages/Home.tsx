import React, {useEffect, useState} from 'react';
import {Button, Linking, Text, TextInput, View} from 'react-native';
import {IAppLinks} from '../../App.tsx';
import database from '@react-native-firebase/database';

export const Home = () => {
  const [data, setData] = useState({
    name: '',
    type: '',
    description: '',
    cost: 0,
  });
  const [isPaid, setIsPaid] = useState(false);

  const openApp = async (url: string) => {
    database().ref('/gastos').push({
      name: data.name,
      type: data.type,
      description: data.description,
      cost: data.cost,
    });
    if (url !== '') {
      Linking.openURL(url).catch(err => console.log('App:e', err));
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

  return (
    <View style={{padding: 15, width: '100%', height: '100%', display: 'flex'}}>
      <Text>miembro</Text>
      <TextInput
        placeholder={'Sofi, Simon'}
        onChangeText={value =>
          setData(prev => ({
            ...prev,
            name: value,
          }))
        }
      />
      <Text>importe</Text>
      <TextInput
        placeholder={'importe'}
        onChangeText={value =>
          setData(prev => ({
            ...prev,
            cost: +value,
          }))
        }
      />
      <Text>Despcripcion</Text>
      <TextInput
        placeholder={'Descripcion'}
        onChangeText={value =>
          setData(prev => ({
            ...prev,
            description: value,
          }))
        }
      />
      <Text>Tipo</Text>
      <TextInput
        placeholder={'Visa, Efectivo , etc'}
        onChangeText={value =>
          setData(prev => ({
            ...prev,
            type: value,
          }))
        }
      />
      <Text>Metado de pago</Text>
      {appsLinks.map((app, index) => {
        return (
          <View key={index} style={{marginTop: 20}}>
            <Button title={app.name} onPress={() => openApp(app.url)} />
          </View>
        );
      })}
      <Text>{isPaid ? 'PAGADO' : ''}</Text>
    </View>
  );
};
