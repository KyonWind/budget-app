import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useKyonRouterContext } from "../context/KyonRouterContext.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { profiles } from "./profiles/profiles.ts";
import { Loading } from "../pages/Loading.tsx";
import { useKyonGoogleLogin } from "../KyonToolBox/hooks/useKyonGoogleLogin.tsx";
import { KyonMasterView } from "../KyonToolBox/components/KyonMasterView.tsx";

export const KyonRouter = () => {

  const Stack = createNativeStackNavigator();

  const { activeProfile, setActiveProfile} = useKyonRouterContext();
  const {isLogged} = useKyonRouterContext();
  const [routes, setRoutes] = useState<any>()
  const [initialRoute, setinitialRoute] = useState<any>('loading')

  console.log('KyonRouter:isLogged',isLogged);

  const selectProfile = useCallback( () => {
    if(isLogged) {
      setActiveProfile('private');
    } else {
      setActiveProfile('public');
    }
  },[isLogged])

  useEffect(() => {
    selectProfile()
  }, [isLogged]);

  useEffect(() => {
    loadProfileRoutes()
  }, [activeProfile]);

  const loadProfileRoutes = () => {
    const profile = profiles.find(profile => profile.profileName === activeProfile);
    if(profile) { setRoutes(profile.routes.map((route, index) => <Stack.Screen key={index} name={route.name} component={route.component}/>))
    setinitialRoute(profile.initialScreen)
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
          {routes ? routes: <Stack.Screen  name={'loading'} component={Loading}/>}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
