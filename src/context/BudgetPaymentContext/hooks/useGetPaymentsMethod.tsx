import database from "@react-native-firebase/database";
import { IGasto } from "../../../pages/Home.tsx";
import { useBudgetProfileContext } from "../../BudgetProfileContext/BudgetProfileContext.tsx";
import { useState } from "react";
import { IPayment } from "../BudgetPaymentInterfaces.ts";

export const useGetPaymentsMethod = () => {
  const { profile } = useBudgetProfileContext();

  const getPaymentsMethods = async ():Promise<string> => {
    try {
      let expenses = await database().ref(`/${profile.user}/paymentMethods`).once('value');
      const ExpensesMap = new Map<string, IPayment>();
      Object.keys(expenses.val()).forEach(id => {
        const r =  expenses.val()[id];
        r.id = id
        ExpensesMap.set(id, r);
      })
      let ArrayExpenses = Array.from(ExpensesMap.values()).filter(expense => !(expense.name !== profile.name && expense.category === 'Personal') )
      // @ts-ignore
      ArrayExpenses = ArrayExpenses.sort((a: any,b: any) => new Date(a.date).toLocaleDateString('en-GB') + new Date(b.date).toLocaleDateString('en-GB'));
      setPayments(ArrayExpenses);
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
    getPaymentsMethods
  }

}
