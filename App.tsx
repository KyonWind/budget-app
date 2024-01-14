import React from "react";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {KyonThemeContextProvider} from './src/context';
import {KyonMasterTheme} from './src/theme/KyonMasterTheme.tsx';
import { KyonRouterContextProvider } from "./src/context/KyonRouterContext.tsx";
import { KyonRouter } from "./src/router/KyonRouter.tsx";
import { useKyonAsyncStorageListener } from "./src/KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
export interface IAppLinks {
  name: string;
  url: string;
}

function App(): React.JSX.Element {

  const { clear} = useKyonAsyncStorageListener();


  clear('token');

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };




  return (
    <KyonThemeContextProvider theme={KyonMasterTheme}>
      <KyonRouterContextProvider>
          <KyonRouter/>
      </KyonRouterContextProvider>
    </KyonThemeContextProvider>
  );
}
export default App;
