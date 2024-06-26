import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Switch } from "react-native";
import { useBudgetApiDolarContext } from "@context/BudgetApiDollarContext";
import { useBudgetProfileContext } from "@context/BudgetProfileContext";
import { FireBaseService } from "@service/firebaseService";
import { KyonMasterButton, KyonMasterText, KyonMasterView } from "@kyon/components";
import { DateFormat } from "../utils/dateformat.ts";
import {IPayments} from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";
import React from "react";



export const Home = () => {

  const navigation = useNavigation();
  const [lastPayments, setLastPayments] = useState<IPayments[]>([]);
  const [categories, setCategories] = useState<any>();
  const [total, setTotal] = useState<any>(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const {quotation } = useBudgetApiDolarContext();
  const [showOnDollars, setShowOnDollars] = useState(false);

  const { profile } = useBudgetProfileContext();

  const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y === 0) {
       await getPayments()
    }
  }

  const getPayments = async () => {
    try {
      let expenses = await FireBaseService.get('gastos');
      if(typeof expenses === 'string') throw new Error('error');
      expenses = expenses.filter(expense => !(expense.name !== profile.name && expense.category === 'Personal') )
      // @ts-ignore
      expenses = expenses.sort((a: any,b: any) => {
        return (DateFormat.getDate(a.date).getTime()) - (DateFormat.getDate(b.date).getTime());
      });
      sortCostByCategory(expenses);
      setLastPayments(expenses.reverse());
    } catch (e) {
      console.log('getPaymentTypes:',e);
    }
  }

  const sortCostByCategory = (payments: IPayments[]) => {

    const result: {[k:string]: number} = {}
      payments.forEach((obj) => {
      let key = obj.category;
      if (typeof key === "string"){
      if(!result[key]) {
        result[key] = showOnDollars ? +obj.cost / (obj.quotationUSD ?? quotation) : +obj.cost;
      } else {
        result[key] += showOnDollars ? +obj.cost / (obj.quotationUSD ?? quotation) : +obj.cost;
      }
      }
    });
    setCategories(result);
    const total = Object.values(result).reduce((acc, obj) => {
        acc += +obj
      return acc
    });
    setTotal(total.toLocaleString('en-GB', {maximumFractionDigits: 2 }));
  }



  useEffect(() => {
    getPayments();
  }, [showOnDollars]);


  return (
    <KyonMasterView variant={'container'} wrapperStyle={{height: '100%'}}>
      <KyonMasterView variant={'container'} wrapperStyle={{height:'50%', marginBottom: 45}}>
        <KyonMasterText variant={'mainTitle'} text={'Ultimos pagos'}/>
        <ScrollView ref={scrollViewRef} onScroll={handleScroll} contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        {lastPayments && lastPayments.map((payment:IPayments, index) =>
          <KyonMasterView key={index} variant={"card"} alignItems={'center'}>
            <KyonMasterView flexDirection={'row'} justifyContent={'center'} wrapperStyle={{width:'100%'}}>
              <KyonMasterText variant={'cardText'}  text={`User : ${payment.name}`} wrapperStyle={{marginRight:15}}/>
              <KyonMasterText variant={'cardText'}  text={`Fecha : ${payment.date}`}/>
            </KyonMasterView>
            <KyonMasterText variant={'cardText'}  text={`Cost ${showOnDollars ? 'U$D' : 'ARG'}: ${(showOnDollars ? +payment.cost / (payment.quotationUSD ?? quotation) : +payment.cost).toLocaleString('de-DE', {maximumFractionDigits: 2 })}`}/>
            <KyonMasterText variant={'cardText'}  text={`Categoria : ${payment.category}`}/>
            <KyonMasterText variant={'cardText'} textStyle={{fontSize:10}}  text={`Description : ${payment.description}`}/>
          </KyonMasterView>
        )}
        </ScrollView>
      </KyonMasterView>
      { categories &&
      <KyonMasterView variant={'card'}  wrapperStyle={{padding: 15}}>
        { Object.keys(categories).map((key, index) => (
          <KyonMasterText key={index}  variant={"cardText"}  text={`${key} ${showOnDollars ? 'U$D' : 'ARG'}: ${(categories[key]).toLocaleString('de-DE', {maximumFractionDigits: 2 })}`} wrapperStyle={{ borderBottomColor: 'lightgray', borderBottomWidth: 1, height:35, width: 300 }} />
        ))}
      </KyonMasterView>
      }
      <KyonMasterView variant={'container-row'} flexDirection={'row'}>
        <KyonMasterText variant={"h1"}  text={'Total: '} />
        <KyonMasterText variant={"h1"}  text={`${showOnDollars ? 'U$D' : 'ARG'}${total}`} />
      </KyonMasterView>
      <KyonMasterButton onPress={() => {
        navigation.navigate('newPayment' as never);
      }} wrapperStyle={{width: 300}} title={'nuevo pago'}/>
      <KyonMasterView flexDirection={'row'}>
        <Switch value={showOnDollars} onChange={()=> setShowOnDollars((prev) => !prev)}/>
        <KyonMasterText text={'U$D'}/>
      </KyonMasterView>
    </KyonMasterView>
  );
};
