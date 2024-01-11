import React, { useEffect, useState } from "react";
import {SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {KyonThemeContextProvider} from './src/context';
import {KyonMasterTheme} from './src/theme/KyonMasterTheme.tsx';
import { Login } from "./src/pages/Login.tsx";
import { useKyonAsyncStorageListener } from "./src/KyonToolBox/hooks/useKyonAsyncStorageListener.tsx";
import { Home } from "./src/pages/Home.tsx";
import { useKyonGoogleLogin } from "./src/KyonToolBox/hooks/useKyonGoogleLogin.tsx";
export interface IAppLinks {
  name: string;
  url: string;
}

function App(): React.JSX.Element {


 const { getItem } = useKyonAsyncStorageListener();
 const { isLogged} = useKyonGoogleLogin();
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

const test = async () => {
  console.log('App:token',await getItem('token'));
  console.log('App:profile',await getItem('profile'));
}
test();



  return (
    <KyonThemeContextProvider theme={KyonMasterTheme}>
      <SafeAreaView style={backgroundStyle}>
        {isLogged ? <Home/> : <Login/>}
      </SafeAreaView>
    </KyonThemeContextProvider>
  );
}
export default App;
