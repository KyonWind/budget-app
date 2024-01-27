import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";
import database from "@react-native-firebase/database";
import { useKyonAsyncStorageListener } from "../KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { KyonMasterButton } from "../KyonToolBox/components/KyonMasterButton.tsx";
import { useNavigation } from "@react-navigation/native";

export interface IGasto {
  name?: string;
  type?: string;
  description?: string;
  cost?: string;
  category?: string;
  url: string;
  paymentMethod?: string;
  date?: string;
}
export const Home = () => {

  const navigation = useNavigation();
  const [lastPayments, setLastPayments] = useState<IGasto[]>([]);
  const [categories, setCategories] = useState<any>();
  const [total, setTotal] = useState<any>(0);
  const scrollViewRef = useRef();

  const handleScroll = async (event) => {
    if (event.nativeEvent.contentOffset.y === 0) {
       await getPayments()
    }
  }

  const getPayments = async () => {
    try {
      let expenses = await database().ref(`/gastos`).once('value');
      let ArrayExpenses: any[] = Array.from(Object.values(expenses.val()));
      ArrayExpenses = ArrayExpenses.sort((a,b) => new Date(a.date).toLocaleDateString('en-GB') + new Date(b.date).toLocaleDateString('en-GB'));
      sortCostByCategory(ArrayExpenses);
      setLastPayments(ArrayExpenses);
    } catch (e) {
      console.log('getPaymentTypes:',e);
    }
  }

  const sortCostByCategory = (payments: IGasto[]) => {

    const result = {}
      payments.forEach((obj) => {
      let key = obj.category;
      if(!result[key]) {
        result[key] = +obj.cost;
      } else {
        result[key] += +obj.cost;
      }
    });
    setCategories(result);
    const total = Object.values(result).reduce((acc, obj) => {
        acc += +obj
      return acc
    });
    setTotal(total.toLocaleString('de-DE', {maximumFractionDigits: 2 }));
  }



  useEffect(() => {
    getPayments();
  }, []);

  return (
    <KyonMasterView variant={'container'} wrapperStyle={{height: '100%'}}>
      <KyonMasterView variant={'container'} wrapperStyle={{height:'50%', marginBottom: 45}}>
        <KyonMasterText variant={'mainTitle'} text={'Ultimos pagos'}/>
        <ScrollView ref={scrollViewRef} onScroll={handleScroll} contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        {lastPayments && lastPayments.map((payment:IGasto, index) =>
          <KyonMasterView key={index} variant={"card"} alignItems={'center'}>
            <KyonMasterView flexDirection={'row'} justifyContent={'center'} wrapperStyle={{width:'100%'}}>
              <KyonMasterText variant={'cardText'}  text={`User : ${payment.name}`} wrapperStyle={{marginRight:15}}/>
              <KyonMasterText variant={'cardText'}  text={`Fecha : ${payment.date}`}/>
            </KyonMasterView>
            <KyonMasterText variant={'cardText'}  text={`Cost : ${(+payment.cost).toLocaleString('de-DE', {maximumFractionDigits: 2 })}`}/>
            <KyonMasterText variant={'cardText'}  text={`Categoria : ${payment.category}`}/>
            <KyonMasterText variant={'cardText'} textStyle={{fontSize:10}}  text={`Description : ${payment.description}`}/>
          </KyonMasterView>
        )}
        </ScrollView>
      </KyonMasterView>
      { categories &&
      <KyonMasterView variant={'card'}  wrapperStyle={{padding: 15}}>
        { Object.keys(categories).map((key, index) => (
          <KyonMasterText key={index}  variant={"cardText"}  text={`${key}: $${categories[key].toLocaleString('de-DE', {maximumFractionDigits: 2 })}`} wrapperStyle={{ borderBottomColor: 'lightgray', borderBottomWidth: 1, height:35, width: 300 }} />
        ))}
      </KyonMasterView>
      }
      <KyonMasterView variant={'container-row'} flexDirection={'row'}>
        <KyonMasterText variant={"h1"}  text={'Total: '} />
        <KyonMasterText variant={"h1"}  text={`$${total}`} />
      </KyonMasterView>
      <KyonMasterButton onPress={() => {
        navigation.navigate('newPayment');
      }} wrapperStyle={{width: 300}} title={'nuevo pago'}/>
    </KyonMasterView>
  );
};
