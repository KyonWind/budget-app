import { Home } from "../../../pages/Home.tsx";
import { IKyonRoutes } from "../../../interfaces/IKyonRoutes.ts";
import { NewPayment } from "../../../pages/NewPayment.tsx";
import { Payments } from "../../../pages/Payments.tsx";
import { Cards } from "../../../pages/Cards.tsx";


export const PrivateRoutes = ():IKyonRoutes => ({
    profileName: 'private',
    routes:[
      {name: 'home', component: Home},
      {name: 'newPayment', component: NewPayment},
      {name: 'payment', component: Payments},
      {name: 'cards', component: Cards},
    ],
    initialScreen: 'home',
})
