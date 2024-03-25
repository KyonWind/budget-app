import { IKyonRoutes } from "@root/interfaces";
import { Cards, DetailPayment, Home, NewPayment, Payments } from "@root/pages";


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
