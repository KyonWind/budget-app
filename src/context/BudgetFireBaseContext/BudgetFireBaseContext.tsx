import React, {FC,ReactNode,createContext,useContext,useMemo,} from 'react';
import { useSetAccountFirebase } from "./hooks/useSetAccountFirebase.tsx";

export interface BudgetFirebaseValue {
  existOnFirebase: () => void;
}

export const BudgetFirebase = createContext<BudgetFirebaseValue>({
  existOnFirebase: () => {}
});

export interface BudgetFirebaseProvider {children: ReactNode | ReactNode[];}

export const BudgetFirebaseProvider: FC<BudgetFirebaseProvider> = ({ children }) => {

  const { existOnFirebase } = useSetAccountFirebase();

const value = useMemo(() => ({
  existOnFirebase
}), [existOnFirebase]);

    return (
      <BudgetFirebase.Provider value={value}>
        {children}
      </BudgetFirebase.Provider>
    );
};
export const useBudgetFirebase = () => useContext<BudgetFirebaseValue>(BudgetFirebase);
