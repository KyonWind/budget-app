import React, { FC, ReactNode, createContext, useContext, useMemo, useEffect, useState } from "react";
import { useKyonAsyncStorageListener } from "@kyon/hooks";
import { profileInitialState } from "../../const";
import { FireBaseService } from "@service/firebaseService";

export interface BudgetProfileContextValue {
  profile: IProfile;
  getProfile: () => void
}

export interface IProfile {
  name: string;
  email: string;
  user: string;
}

export const BudgetProfileContext = createContext<BudgetProfileContextValue>({
  profile: profileInitialState,
  getProfile: () => {}
});

export interface BudgetProfileContextProvider {children: ReactNode | ReactNode[];}

export const BudgetProfileContextProvider: FC<BudgetProfileContextProvider> = ({ children }) => {
  const [profile, setProfile] = useState<IProfile>(profileInitialState);
  const {getItem} = useKyonAsyncStorageListener();

  const getProfile = async () => {
    let profile: IProfile = JSON.parse(await getItem('profile') as string);
    setProfile(profile);
    FireBaseService.profile = profile;
  }

  useEffect(() => {
    getProfile()
  }, []);

const value = useMemo(() => (
  {
    profile,
    getProfile
  }), [getProfile,profile]);

return (<BudgetProfileContext.Provider value={value}>
{children}
</BudgetProfileContext.Provider>
);
};
export const useBudgetProfileContext = () => useContext<BudgetProfileContextValue>(BudgetProfileContext);
