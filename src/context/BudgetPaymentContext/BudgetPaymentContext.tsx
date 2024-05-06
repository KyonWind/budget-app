import React, {
    FC,
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
    Dispatch,
    SetStateAction
} from "react";
import { useGetPayments } from "./hooks/useGetPayments.tsx";
import { IPayments } from "./BudgetPaymentInterfaces.ts";

export interface BudgetPaymentContextValue {
    getPayments: () => Promise<string>;
    payments?: IPayments[];
    setFiltersPayments: Dispatch<SetStateAction<any>>;
    filteredPayments: () => void;
}

export const BudgetPaymentContext = createContext<BudgetPaymentContextValue>({
    getPayments: () => Promise.resolve(''),
    payments: undefined,
    setFiltersPayments: () => {},
    filteredPayments: () => Promise.resolve(''),
});

export interface BudgetPaymentContextProvider {children: ReactNode | ReactNode[];}

export const BudgetPaymentContextProvider: FC<BudgetPaymentContextProvider> = ({ children }) => {
    const [total, setTotal] = useState<any>(0);
    const {getPayments, payments, setFiltersPayments, filteredPayments} = useGetPayments();

    useEffect(() => {
        !payments && getPayments()
    }, [payments]);


const value = useMemo(() => ({
    getPayments,
    payments,
    setFiltersPayments,
    filteredPayments
}), [getPayments]);

return (
    <BudgetPaymentContext.Provider value={value}>
      {children}
    </BudgetPaymentContext.Provider>
);
};
export const useBudgetPaymentContext = () => useContext<BudgetPaymentContextValue>(BudgetPaymentContext);
