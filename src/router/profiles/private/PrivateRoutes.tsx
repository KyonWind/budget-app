import { Home } from "../../../pages/Home.tsx";
import { IKyonRoutes } from "../../../interfaces/IKyonRoutes.ts";
import { NewPayment } from "../../../pages/NewPayment.tsx";


export const PrivateRoutes = ():IKyonRoutes => ({
    profileName: 'private',
    routes:[
      {name: 'home', component: Home},
      {name: 'newPayment', component: NewPayment},
    ],
    initialScreen: 'Home',
})
