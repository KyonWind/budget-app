import { useBudgetProfileContext } from "@context/BudgetProfileContext";
import {useCallback, useEffect, useMemo, useState} from "react";
import {IFiltersPayments, IPayments} from "@context/BudgetPaymentContext/BudgetPaymentInterfaces.ts";
import { FireBaseService } from "@service/firebaseService";
import { DateFormat } from "../../../utils/dateformat.ts";
import {filterInitialState} from "@const/initialStates.ts";


export const useGetPayments = () => {
  const { profile } = useBudgetProfileContext();
  const [payments, setPayments] = useState<IPayments[]>();
  const [filtersPayments, setFiltersPayments] = useState<IFiltersPayments>(filterInitialState);

  const filteredPayments = useCallback(async () => {
    const newPayments: any[] = await FireBaseService.get('gastos');
    setPayments(newPayments?.filter((payment: any) =>
      !filtersPayments?.description || payment?.description?.toLowerCase().includes(filtersPayments?.description.toLowerCase())))
  },[payments,filtersPayments])

  const getPayments = async ():Promise<string> => {
    try {
      let expenses = await FireBaseService.get('gastos');
      if (typeof expenses !== "string") {
        // @ts-ignore
        setPayments(() => expenses.sort((a: any,b: any) =>
          DateFormat.getDate(a.date).getTime() - DateFormat.getDate(b.date).getTime())
          .filter(expense => !(expense.name !== profile.name && expense.category === "Personal")).reverse())
      }
      // @ts-ignore
      return expenses.sort((a: any,b: any) =>
        DateFormat.getDate(a.date).getTime() - DateFormat.getDate(b.date).getTime())
        .filter((expense: any) => !(expense.name !== profile.name && expense.category === "Personal")).reverse();
    } catch (e: any) {
      console.log('getPaymentTypes:',e);
      return e?.toString();
    }
  }

 /* const sortCostByCategory = (payments: IPayments[]) => {
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
  } */

  useEffect(() => {
    const debounce = setTimeout(() => filteredPayments(),500)
    return () => clearTimeout(debounce)
  }, [filtersPayments]);
  return {
    payments,
    getPayments,
    setFiltersPayments,
    filteredPayments
  }

}
