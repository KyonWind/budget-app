import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";
import { KyonMasterText } from "../KyonToolBox/components";
import { useBudgetPaymentContext } from "../context/BudgetPaymentContext/BudgetPaymentContext.tsx";
import { Pressable, ScrollView } from "react-native";
import React from "react";
import { IPayment } from "../context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";
import { useNavigation } from "@react-navigation/native";

export const Payments = () => {
  const navigation = useNavigation();
  const {payments} = useBudgetPaymentContext();

  return (
    <KyonMasterView variant={'background'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        <KyonMasterView alignItems={'center'} justifyContent={'center'} wrapperStyle={{ width: '100%', display:'flex', flexDirection: 'row', flexWrap:'wrap'}} >
        {payments && payments.map((payment:IPayment, index) =>
          <Pressable key={index} onPress={() => navigation.navigate('paymentDetail' as never ,{...payment} as never )} style={{width:'80%', margin: 15}}>
          <KyonMasterView key={index} variant={"card"} alignItems={'center'} wrapperStyle={{width: '100%'}}>
            <KyonMasterView flexDirection={'row'} justifyContent={'center'} wrapperStyle={{width:'100%'}}>
              <KyonMasterText variant={'cardText'}  text={`User : ${payment.name}`} wrapperStyle={{marginRight:15}}/>
              <KyonMasterText variant={'cardText'}  text={`Fecha : ${payment.date}`}/>
            </KyonMasterView>
            <KyonMasterText variant={'cardText'}  text={`ARS ${(+payment.cost).toLocaleString('de-DE', {maximumFractionDigits: 2 })}`}/>
            <KyonMasterText variant={'cardText'}  text={`Categoria : ${payment.category}`}/>
            <KyonMasterText variant={'cardText'} textStyle={{fontSize:10}}  text={`Description : ${payment.description}`}/>
          </KyonMasterView>
          </Pressable>
        )}
        </KyonMasterView>
      </ScrollView>
    </KyonMasterView>
  )
}
