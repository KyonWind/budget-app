import { useBudgetProfileContext } from "@context/BudgetProfileContext";
import { useState } from "react";
import { IPayment } from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";
import { FireBaseService } from "@service/firebaseService";
import { IGasto } from "@pages/Home.tsx";
import { DateFormat } from "../../../utils/dateformat.ts";


export const useGetPayments = () => {
  const { profile } = useBudgetProfileContext();
  const [payments, setPayments] = useState<IPayment[]>()

  const getPayments = async ():Promise<string> => {
    try {
      let expenses = await FireBaseService.get('gastos');
      if (typeof expenses !== "string") {
        // @ts-ignore
        setPayments(() => expenses.sort((a: any,b: any) =>
          DateFormat.getDate(a.date).getTime() - DateFormat.getDate(b.date).getTime())
          .filter(expense => !(expense.name !== profile.name && expense.category === "Personal")).reverse())
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
