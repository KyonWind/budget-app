import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IGasto } from "@pages/Home.tsx";
import { IAppLinks } from "../../App.tsx";
import { useBudgetApiDolarContext } from "@context/BudgetApiDollarContext";
import { useNavigation } from "@react-navigation/native";
import { useBudgetProfileContext } from "@context/BudgetProfileContext";
import { formInitialState } from "@const/initialStates.ts";
import { FireBaseService } from "@service/firebaseService";
import { Linking, Switch, View } from "react-native";
import { KyonMasterButton, KyonMasterInput, KyonMasterModal, KyonMasterText, KyonMasterView } from "@kyon/components";


interface IFormPago {
  setData: Dispatch<SetStateAction<any>>;
  data: IGasto;
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

  const prepareInstallment = (installmentCuantity) => {
    console.log('%cFormPago:prepareInstallment','color:yellow',installmentCuantity);
    const array =  Array(+installmentCuantity);
    console.log('%cFormPago:prepareInstallment','color:yellow',array);
  }

  return (
    <View>
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
      {isInstallments && <KyonMasterInput
        type={'modal'}
        label={'cuotas'}
        value={installments[data.installments]}
        placeholder={'cantidad de cuotas'}
        options={installments?.map((app, index) => {
          return (
            <View key={index} style={{marginTop: 20}}>
              <KyonMasterButton
                title={app.description}
                onPress={() =>
                  setData((prev: IGasto) => ({
                    ...prev,
                    installments: prepareInstallment(app.id),
                  }))
                }
              />
            </View>
          );
        })}
        onChangeText={value =>
          setData((prev: IGasto) => ({
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
        options={paymentIntermediaries?.map((app, index) => {
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
