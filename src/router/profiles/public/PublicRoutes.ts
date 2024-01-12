import { Login } from "../../../pages/Login.tsx";
import { IKyonRoutes } from "../../../interfaces/IKyonRoutes.ts";


export const PublicRoutes = (): IKyonRoutes => {

  return {
    profileName: 'public',
    routes:[
      { name: 'login',component: Login},
    ],
    initialScreen: 'login',
  }
}
