import React, { FC, ReactNode, createContext, useContext, useMemo, useState, Dispatch, SetStateAction } from "react";
import { useSetAccountFirebase } from "./hooks";

export interface BudgetFirebaseValue {
  existOnFirebase: () => void;
  debugComment: string|undefined,
  setDebugComment: Dispatch<SetStateAction<string|undefined>>
}

export const BudgetFirebase = createContext<BudgetFirebaseValue>({
  existOnFirebase: () => {},
  debugComment: '',
  setDebugComment: () => {}
});

export interface BudgetFirebaseProvider {children: ReactNode | ReactNode[];}

export const BudgetFirebaseProvider: FC<BudgetFirebaseProvider> = ({ children }) => {
  const [debugComment, setDebugComment] = useState<string|undefined>(undefined)
  const { existOnFirebase } = useSetAccountFirebase(setDebugComment);


const value = useMemo(() => ({
  existOnFirebase,
  setDebugComment,
  debugComment
}), [existOnFirebase,setDebugComment,debugComment]);

    return (
      <BudgetFirebase.Provider value={value}>
        {children}
      </BudgetFirebase.Provider>
    );
};
export const useBudgetFirebase = () => useContext<BudgetFirebaseValue>(BudgetFirebase);
