import React from "react";
import {KyonThemeContextProvider} from './src/context';
import {KyonMasterTheme} from './src/theme/KyonMasterTheme.tsx';
import { KyonRouterContextProvider } from "./src/context/KyonRouterContext.tsx";
import { KyonRouter } from "./src/router/KyonRouter.tsx";
import { useKyonAsyncStorageListener } from "./src/KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { BudgetFirebaseProvider } from "./src/context/BudgetFireBaseContext";
export interface IAppLinks {
  name: string;
  url: string;
}

function App(): React.JSX.Element {
  const { clear} = useKyonAsyncStorageListener();
  //clear('token');
  return (
    <KyonThemeContextProvider theme={KyonMasterTheme}>
      <KyonRouterContextProvider>
        <BudgetFirebaseProvider>
            <KyonRouter/>
        </BudgetFirebaseProvider>
      </KyonRouterContextProvider>
    </KyonThemeContextProvider>
  );
}
export default App;
