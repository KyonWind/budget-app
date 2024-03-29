import { KyonMasterInput, KyonMasterText } from "../KyonToolBox/components";
import { Linking, View } from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {IAppLinks} from '../../App.tsx';
import {IGasto} from '../pages/Home.tsx';
import database from '@react-native-firebase/database';
import {formInitialState} from '../const';
import { useKyonAsyncStorageListener } from "../KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { KyonMasterModal } from "../KyonToolBox/components/KyonMasterModal.tsx";
import { KyonMasterButton } from "../KyonToolBox/components/KyonMasterButton.tsx";
import { useNavigation } from "@react-navigation/native";
import { useBudgetApiDolarContext } from "@context/BudgetApiDollarContext/BudgetApiDolarContext.tsx";
import { useBudgetProfileContext } from "../context/BudgetProfileContext/BudgetProfileContext.tsx";
import { FireBaseService } from "../services/firebaseService/FirebaseService.ts";

interface IFormPago {
  setData: Dispatch<SetStateAction<any>>;
  data: IGasto;
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
  const [categories, setCategories] = useState<any>();
  const [newPayment, setNewPayment] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isDisabled, setIsDisable] = useState<boolean>(true);
  const {quotation } = useBudgetApiDolarContext();
  const {getItem} = useKyonAsyncStorageListener();
  const navigation = useNavigation();
  const { profile } = useBudgetProfileContext();

  const validate = useCallback(() => {
    for (let item of Object.values(data)) {
      if(typeof item !== "number") {
      if (!item || (item?.trim() === '')) {
        setIsDisable(true);
        break;
      } else {
        setIsDisable(false);
      }
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
    const response =  FireBaseService.post('gastos',{
      name: profile.name,
      type: data.type,
      description: data.description,
      cost: data.cost,
      quotationUSD: quotation,
      paymentMethod: data.paymentMethod,
      category: data.category,
      date: data.date,
    });
    if (data.url !== '') {
      Linking.openURL(data.url).catch(err => console.log('App:e', err));
    } else {
      setIsPaid(true);
    }
    setIsPaid(true);
    navigation.navigate('home' as never);
  },[data]);

  const editPayment = useCallback( async () => {
    data.id && FireBaseService.put('gastos', data?.id, {
      name: data.name,
      type: data.type,
      description: data.description,
      cost: data.cost,
      quotationUSD: data.quotationUSD,
      paymentMethod: data.paymentMethod,
      category: data.category,
      date: data.date,
    });
    console.log('%cFormPago:','color:yellow', data.url !== undefined);
    if (data.url !== undefined && data.url !== '') {
      Linking.openURL(data.url).catch(err => console.log('App:e', err));
    } else {
      setIsPaid(true);
    }
    setIsPaid(true);
    console.log('%cFormPago:','color:yellow','backhome');
    navigation.navigate('payment' as never);
  },[data]);

  const getPaymentTypes = useCallback( async () => {
    try {
      await database().ref(`/users/${profile?.user}/paymentMethods`).once('value')
        .then(snapshot => {
          setPaymentTypes(Array.from(Object.values(snapshot.val())))
        });
    } catch (e) {
      console.log('getPaymentTypes:',e);
    }

  },[paymentTypes])

  const getCategory = useCallback( async () => {
    let profile = await getItem('profile');
    //@ts-ignore
    profile = JSON.parse(profile);
    try {
      // @ts-ignore
      let category = await FireBaseService.get('Category');
      // @ts-ignore
      category = Array.from(Object.values(category.val()));
      setCategories(category);
    } catch (e) {
      console.log('getPaymentTypes:',e);
    }
  },[categories,setCategories])

  useEffect(() => {
    getPaymentTypes();
    getCategory();
  }, []);

  const addPaymentTypes = useCallback( async () => {
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
          setData((prev: IGasto) => ({
            ...prev,
            cost: value,
          }))
        }
        label={'importe'}
      />
      <KyonMasterInput
        type={'modal'}
        label={'categoria'}
        value={data.category}
        placeholder={'categoria'}
        onChangeText={value =>
          setData((prev: IGasto) => ({
            ...prev,
            category: value,
          }))

        }
        options={categories?.map((category: string, index: number) => {
          return <KyonMasterButton key={index} title={category} onPress={()=> setData((prev: IGasto) => ({
            ...prev,
            category: category,
          }))} />;
        })}
      />
      <KyonMasterInput
        type={'select'}
        label={'descripcion'}
        value={data.description}
        placeholder={'descripcion'}
        onChangeText={value =>
          setData((prev: IGasto) => ({
            ...prev,
            description: value,
          }))
        }
      />
      <KyonMasterInput
        type={'select'}
        label={'fecha'}
        value={data.date}
        placeholder={'Fecha'}
        onChangeText={value =>
          setData((prev: IGasto) => ({
            ...prev,
            date: value,
          }))
        }
      />
      <KyonMasterInput
        type={'modal'}
        label={'tipo'}
        value={data.type}
        placeholder={'Visa, Efectivo , etc'}
        onChangeText={value =>
          setData((prev: IGasto) => ({
            ...prev,
            type: value,
          }))

        }
        options={paymentTypes.map((type: {name: string}, index) => {
          return <KyonMasterButton key={index} title={type.name} onPress={()=> setData((prev: IGasto) => ({
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
                  setData((prev: IGasto) => ({
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
          setData((prev: IGasto) => ({
            ...prev,
            paymentMethod: value,
          }))
        }
      />
      <KyonMasterButton disabled={isDisabled} title={'PAGAR'} onPress={() => data.id ? editPayment() : savePayment()} />
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
