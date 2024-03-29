
import { useNavigation } from "@react-navigation/native";
import { useBudgetPaymentContext } from "@root/context";
import { KyonMasterText, KyonMasterView } from "@kyon/components";
import { SearchFilters } from "@root/components";
import { Animated, Pressable } from "react-native";
import ScrollView = Animated.ScrollView;
import { IPayment } from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";


export const Payments = () => {
  const navigation = useNavigation();
  const {payments} = useBudgetPaymentContext();

  return (
    <KyonMasterView variant={'background'}>
      <SearchFilters />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        <KyonMasterView alignItems={'center'} justifyContent={'center'} wrapperStyle={{ width: '100%', display:'flex', flexDirection: 'row', flexWrap:'wrap'}} >
        {payments && payments.map((payment:IPayment, index) =>
          <Pressable key={index} onPress={() => navigation.navigate('paymentDetail' as never,{...payment} as never )} style={{width:'80%', margin: 15}}>
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
