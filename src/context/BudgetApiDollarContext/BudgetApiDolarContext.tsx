import React, { FC, ReactNode, createContext, useContext, useMemo, useState, useEffect } from "react";
import { usdApiValue } from "../../const";

export interface BudgetApiDolarContextValue {
  getQuotation: () => void;
  quotation: number
}

export const BudgetApiDolarContext = createContext<BudgetApiDolarContextValue>({
  getQuotation: () => usdApiValue,
  quotation: 0
});

export interface BudgetApiDolarContextProvider {children: ReactNode | ReactNode[];}

export const BudgetApiDolarContextProvider: FC<BudgetApiDolarContextProvider> = ({ children }) => {

  const [quotation, setQuotation] = useState(0);
  const getQuotation = async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares/blue");
      const data = await response.json();
      setQuotation(data.venta)
    } catch (e) {
      console.log('%cBudgetApiDolarContext:getQuotation','color:yellow',e);
    }
  }

  useEffect(() => {
    getQuotation()
  }, []);


const value = useMemo(() => ({
  getQuotation,
  quotation
}), [getQuotation,quotation]);

return (
  <BudgetApiDolarContext.Provider value={value}>
    {children}
  </BudgetApiDolarContext.Provider>
      );
};
export const useBudgetApiDolarContext = () => useContext<BudgetApiDolarContextValue>(BudgetApiDolarContext);
