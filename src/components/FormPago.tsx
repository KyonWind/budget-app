import { KyonMasterInput, KyonMasterText } from "../KyonToolBox/components";
import { Alert, Button, Linking, Modal, ScrollView, Text, View } from "react-native";
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
import { useKyonAsyncStorageListener } from "../KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { KyonMasterModal } from "../KyonToolBox/components/KyonMasterModal.tsx";
import { KyonMasterButton } from "../KyonToolBox/components/KyonMasterButton.tsx";

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
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [newPayment, setNewPayment] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false)
  const [isDisabled, setIsDisable] = useState<boolean>(true);
  const {getItem} = useKyonAsyncStorageListener();


  const validate = useCallback(() => {
    console.log('FormPago:item',data.description.trim() === '', !data.description);
    for (let item of Object.values(data)) {
      if (!item || item.trim() === '') {
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
        setData(formInitialState);
      }, 1000);
    }
  }, [isPaid]);

  const savePayment = useCallback( async () => {
    let profile = await getItem('profile');
    //@ts-ignore
    profile = JSON.parse(profile);
    database().ref('/gastos').push({
      name: profile?.name,
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
    setIsPaid(true);
  },[data]);

  const getPaymentTypes = useCallback( async () => {
    let profile = await getItem('profile');
    //@ts-ignore
    profile = JSON.parse(profile);
    try {
      await database().ref(`/users/${profile?.user}/paymentMethods`).once('value')
        .then(snapshot => {
          console.log('User data: ',Array.from(Object.values(snapshot.val())));
          setPaymentTypes(Array.from(Object.values(snapshot.val())))
        });
    } catch (e) {
      console.log('getPaymentTypes:',e);
    }

  },[])

  useEffect(() => {
    getPaymentTypes();
  }, []);

  const addPaymentTypes = useCallback( async () => {
    let profile = await getItem('profile');
    //@ts-ignore
    profile = JSON.parse(profile);
    console.log('FormPago:addPaymentTypes',`/users/${profile?.user}`);
    try {
       database()
        .ref(`users/${profile?.user}/paymentMethods`)
        .push({
          name: newPayment,
        });
      setNewPayment('');
      setOpenPaymentModal(false);
      await getPaymentTypes()
    } catch (e) {
      console.log('getPaymentTypes:',e);
    }

  },[newPayment])

  return (
    <View>
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
        type={'modal'}
        label={'tipo'}
        value={data.type}
        placeholder={'Visa, Efectivo , etc'}
        onChangeText={value =>
          setData((prev: IData) => ({
            ...prev,
            type: value,
          }))

        }
        options={paymentTypes.map((type: {name: string}, index) => {
          return <KyonMasterButton key={index} title={type.name} onPress={()=> setData((prev: IData) => ({
            ...prev,
            type: type.name,
          }))} />;
        })}
        footerOptions={[
          <KyonMasterButton key={1234} title={'Agregar'} onPress={()=>
            setOpenPaymentModal(true)}/>
        ]}
      />
      <KyonMasterInput
        type={'modal'}
        label={'metodo de pago'}
        placeholder={'metodo'}
        value={data.paymentMethod}
        options={appsLinks.map((app, index) => {
          return (
            <View key={index} style={{marginTop: 20}}>
              <KyonMasterButton
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
      <KyonMasterButton disabled={isDisabled} title={'PAGAR'} onPress={() => savePayment()} />
      <KyonMasterText textStyle={{color: '#d71c1c',fontSize: 40}} text={isPaid ? 'PAGADO' : ''} />
      <KyonMasterModal
        headerTitle={'Agregar nuevo metodo de pago'}
        footerOptions={[
          <KyonMasterButton
            key={12345}
            onPress={() => addPaymentTypes()}
            title={'Agregar'}
          />
        ]}
        open={openPaymentModal}
        close={() => setOpenPaymentModal(!openPaymentModal)}
        options={[
          <KyonMasterInput
            key={12345}
            type={'select'}
            label={'descripcion'}
            value={newPayment}
            placeholder={'descripcion'}
            onChangeText={value =>
              setNewPayment(value)
            }
          />
        ]}/>
    </View>
  );
};
