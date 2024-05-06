import { KyonRouterContextProvider } from "@context/KyonRouterContext";
import React from "react";
import { KyonThemeContextProvider } from "@context/KyonThemeContext";
import { KyonMasterTheme } from "@theme/KyonMasterTheme";
import { BudgetFirebaseProvider } from "@context/BudgetFireBaseContext";
import { BudgetProfileContextProvider } from "@context/BudgetProfileContext";
import { BudgetApiDolarContextProvider } from "@context/BudgetApiDollarContext";
import { BudgetPaymentContextProvider } from "@context/BudgetPaymentContext/BudgetPaymentContext";
import { KyonRouter } from "./src/router/KyonRouter";


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
