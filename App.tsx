import { useKyonAsyncStorageListener } from "@kyon/hooks";
import {
  BudgetApiDolarContextProvider,
  BudgetFirebaseProvider, BudgetPaymentContextProvider,
  BudgetProfileContextProvider,
  KyonRouterContextProvider,
  KyonThemeContextProvider
} from "@root/context";
import { KyonMasterTheme } from "@theme/KyonMasterTheme.tsx";
import { KyonRouter } from "@root/router/KyonRouter.tsx";

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
          <BudgetProfileContextProvider>
            <BudgetApiDolarContextProvider>
              <BudgetPaymentContextProvider>
              <KyonRouter/>
              </BudgetPaymentContextProvider>
            </BudgetApiDolarContextProvider>
          </BudgetProfileContextProvider>
        </BudgetFirebaseProvider>
      </KyonRouterContextProvider>
    </KyonThemeContextProvider>
  );
}
export default App;
