import { IKyonRoutes } from "@interface/IKyonRoutes.ts";
import { Home } from "@pages/Home.tsx";
import { NewPayment } from "@pages/NewPayment.tsx";
import { DetailPayment } from "@pages/DetailPayment.tsx";
import { Payments } from "@pages/Payments.tsx";
import { Cards } from "@pages/Cards.tsx";


export const PrivateRoutes = ():IKyonRoutes => ({
    profileName: 'private',
    routes:[
      {name: 'home', component: Home},
      {name: 'newPayment', component: NewPayment},
      {name: 'paymentDetail', component: DetailPayment},
      {name: 'payment', component: Payments},
      {name: 'cards', component: Cards},
    ],
    initialScreen: 'home',
})
