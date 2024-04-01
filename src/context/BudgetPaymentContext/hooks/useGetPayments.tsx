import { useBudgetProfileContext } from "@context/BudgetProfileContext";
import { useState } from "react";
import { IPayment } from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";
import { FireBaseService } from "@service/firebaseService";
import { IGasto } from "@pages/Home.tsx";


export const useGetPayments = () => {
  const { profile } = useBudgetProfileContext();
  const [payments, setPayments] = useState<IPayment[]>()

  const getPayments = async ():Promise<string> => {
    try {
      let expenses = await FireBaseService.get('gastos');
      if (typeof expenses !== "string") {
        // @ts-ignore
        setPayments(() => expenses.sort((a: any,b: any) => new Date(a.date).toLocaleDateString('en-GB') + new Date(b.date).toLocaleDateString('en-GB'))
          .filter(expense => !(expense.name !== profile.name && expense.category === "Personal")))
      }
      return 'getted';
    } catch (e: any) {
      console.log('getPaymentTypes:',e);
      return e?.toString();
    }
  }

  const sortCostByCategory = (payments: IGasto[]) => {
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
    setTotal(total.toLocaleString('de-DE', {maximumFractionDigits: 2 }));
  }

  return {
    payments,
    getPayments
  }

}
