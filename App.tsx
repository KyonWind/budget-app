import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Home} from './src/pages/Home.tsx';
import {KyonThemeContextProvider} from './src/context';
import {KyonMasterTheme} from './src/theme/KyonMasterTheme.tsx';
export interface IAppLinks {
  name: string;
  url: string;
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <KyonThemeContextProvider theme={KyonMasterTheme}>
      <SafeAreaView style={backgroundStyle}>
        <Home />
      </SafeAreaView>
    </KyonThemeContextProvider>
  );
}
export default App;
