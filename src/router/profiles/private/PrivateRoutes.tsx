import { Home } from "../../../pages/Home.tsx";
import { IKyonRoutes } from "../../../interfaces/IKyonRoutes.ts";
import { Form } from "../../../pages/Form.tsx";


export const PrivateRoutes = ():IKyonRoutes => ({
    profileName: 'private',
    routes:[
      {name: 'home', component: Home},
      {name: 'form', component: Form},
    ],
    initialScreen: 'form',
})
