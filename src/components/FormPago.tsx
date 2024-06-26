import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IAppLinks } from "../../App.tsx";
import { useBudgetApiDolarContext } from "@context/BudgetApiDollarContext";
import { useNavigation } from "@react-navigation/native";
import { useBudgetProfileContext } from "@context/BudgetProfileContext";
import { formInitialState } from "@const/initialStates.ts";
import { FireBaseService } from "@service/firebaseService";
import { Linking, ScrollView, Switch, View } from "react-native";
import { KyonMasterButton, KyonMasterInput, KyonMasterModal, KyonMasterText, KyonMasterView } from "@kyon/components";
import { DateFormat } from "../utils/dateformat.ts";
import {IPayments} from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";
import React from "react";


interface IFormPago {
  setData: Dispatch<SetStateAction<any>>;
  data: IPayments;
}


export const FormPago = ({setData, data}: IFormPago) => {
  const [isPaid, setIsPaid] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState<any[]>([]);
  const [installments, setInstallments] = useState<any[]>([]);
  const [paymentIntermediaries, setPaymentIntermediaries] = useState<IAppLinks[]>([]);
  const [categories, setCategories] = useState<any>();
  const [newPayment, setNewPayment] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isDisabled, setIsDisable] = useState<boolean>(true);
  const [isInstallments, setIsInstallments] = useState<boolean>(false);
  const {quotation } = useBudgetApiDolarContext();
  const navigation = useNavigation();
  const { profile } = useBudgetProfileContext();


  console.log(
    DateFormat.addMonth(data.date, 1)
  // @ts-ignore
)

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
  for(let i = 0; i < data?.installments; i++) {
    FireBaseService.post('gastos',{
      name: profile.name,
      type: data.type,
      description: data.description,
      cost: +data.cost /data.installments,
      quotationUSD: quotation,
      paymentMethod: data.paymentMethod,
      category: data.category,
      date: DateFormat.addMonth(data.date, i-1),
      isInstallments: isInstallments,
    });
  }
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
    if (data.url !== undefined && data.url !== '') {
      Linking.openURL(data.url).catch(err => console.log('App:e', err));
    } else {
      setIsPaid(true);
    }
    setIsPaid(true);
    navigation.navigate('payment' as never);
  },[data]);

  const getPaymentTypes = useCallback( async () => {
      setPaymentTypes(await FireBaseService.getPaymentsMethods() as any[])
  },[paymentTypes])

  const getCategory = useCallback( async () => {
      setCategories(await FireBaseService.get('Category'));
  },[categories,setCategories])

  const getInstallments = useCallback( async () => {
    setInstallments(await FireBaseService.get('installments') as any);
  },[installments,setIsInstallments])

  const getPaymentIntermediaries = useCallback(
    async () => {
       setPaymentIntermediaries(await FireBaseService.get("paymentIntermediary") as IAppLinks []);
    },[setPaymentIntermediaries])

  useEffect(() => {
    getPaymentTypes();
    getCategory();
    getPaymentIntermediaries();
    getInstallments();
  }, []);

  const addPaymentTypes = useCallback( async () => {
    try {
       FireBaseService.addPaymentsMethods(newPayment);
      setNewPayment('');
      setOpenPaymentModal(false);
      await getPaymentTypes()
    } catch (e) {
      console.log('getPaymentTypes:',e);
    }

  },[newPayment])

  const prepareInstallment = (installmentQuantity: number) => {
    console.log('%cFormPago:prepareInstallment','color:yellow',installmentQuantity);
    return installmentQuantity
  }

  console.log('%cFormPago:installments','color:yellow',installments);

  return (
    <ScrollView>
      <KyonMasterView flexDirection={'row'}>
        <KyonMasterText text={'un pago'}/>
      <Switch trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={isInstallments ? '#f5dd4b' : '#f4f3f4'} value={isInstallments} onChange={()=> setIsInstallments((prev) => !prev)}/>
        <KyonMasterText text={'pago en cuotas'}/>
      </KyonMasterView>
      <KyonMasterInput
        type={'select'}
        placeholder={'importe'}
        inputMode={'decimal'}
        value={data.cost}
        onChangeText={value =>
          setData((prev: IPayments) => ({
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
          setData((prev: IPayments) => ({
            ...prev,
            category: value,
          }))
        }
        options={categories?.map((category: string, index: number) => {
          return <KyonMasterButton key={index} title={category} onPress={()=> setData((prev: IPayments) => ({
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
          setData((prev: IPayments) => ({
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
          setData((prev: IPayments) => ({
            ...prev,
            date: value,
          }))
        }
      />
      {isInstallments && <KyonMasterInput
        type={'modal'}
        label={'cuotas'}
        value={data.installments}
        placeholder={'cantidad de cuotas'}
        options={installments?.map((app, index) => {
          return <View key={index} style={{marginTop: 20}}>
              <KyonMasterButton
                title={app.description}
                onPress={() => {
                  console.log('%cFormPago:press','color:yellow');
                  setData((prev: IPayments) => ({
                    ...prev,
                    installments: prepareInstallment(app.id)
                  }));
                }
                }
              />
              </View>
        })}
        onChangeText={value =>
          setData((prev: IPayments) => ({
            ...prev,
            installments: value,
          }))
        }
      />}
      <KyonMasterInput
        type={'modal'}
        label={'tipo'}
        value={data.type}
        placeholder={'Visa, Efectivo , etc'}
        onChangeText={value =>
          setData((prev: IPayments) => ({
            ...prev,
            type: value,
          }))

        }
        options={paymentTypes.map((type: {name: string}, index) => {
          return <KyonMasterButton key={index} title={type.name} onPress={()=> setData((prev: IPayments) => ({
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
        options={paymentIntermediaries?.map((app, index) => {
          return (
            <View key={index} style={{marginTop: 20}}>
              <KyonMasterButton
                title={app.name}
                onPress={() =>
                  setData((prev: IPayments) => ({
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
          setData((prev: IPayments) => ({
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
    </ScrollView>
  );
};
