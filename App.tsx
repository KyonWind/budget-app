import { KyonThemeContextProvider } from "@context/KyonThemeContext.tsx";
import { KyonMasterTheme } from "@theme/KyonMasterTheme.tsx";
import { KyonRouterContextProvider } from "@context/KyonRouterContext.tsx";
import { BudgetFirebaseProvider } from "@context/BudgetFireBaseContext";
import { BudgetProfileContextProvider } from "@context/BudgetProfileContext";
import { BudgetApiDolarContextProvider } from "@context/BudgetApiDollarContext";
import { BudgetPaymentContextProvider } from "@context/BudgetPaymentContext";
import { KyonRouter } from "./src/router/KyonRouter.tsx";


export interface IAppLinks {
  name: string;
  url: string;
}

function App(): React.JSX.Element {
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
