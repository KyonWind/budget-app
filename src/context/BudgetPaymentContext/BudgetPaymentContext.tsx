import React, { FC, ReactNode, createContext, useContext, useMemo, useState, useEffect } from "react";
import { useGetPayments } from "./hooks/useGetPayments.tsx";
import { IPayment } from "./BudgetPaymentInterfaces.ts";

export interface BudgetPaymentContextValue {
    getPayments: () => string;
    payments: IPayment[]|undefined;
}

export const BudgetPaymentContext = createContext<BudgetPaymentContextValue>({
    getPayments: () => ' ',
    payments: undefined
});

export interface BudgetPaymentContextProvider {children: ReactNode | ReactNode[];}

export const BudgetPaymentContextProvider: FC<BudgetPaymentContextProvider> = ({ children }) => {
    const [total, setTotal] = useState<any>(0);
    const {getPayments, payments} = useGetPayments();

    useEffect(() => {
        !payments && getPayments()
    }, [payments]);


const value = useMemo(() => ({
    getPayments,
    payments
}), [getPayments]);

return (
    <BudgetPaymentContext.Provider value={value}>
      {children}
    </BudgetPaymentContext.Provider>
);
};
export const useBudgetPaymentContext = () => useContext<BudgetPaymentContextValue>(BudgetPaymentContext);
