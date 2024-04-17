import { DateFormat } from "../utils/dateformat.ts";

export const formInitialState = {
  type: '',
  description: '',
  cost: '',
  url: '',
  paymentMethod: '',
  category: '',
  installments: 1,
  date: DateFormat.formatDate(new Date)
};

export const usdApiValue = {
  casa: "",
  compra: 0,
  fechaActualizacion: "",
  moneda: "",
  nombre: "",
  venta: 0
};

export const profileInitialState = {
    name: '',
    email: '',
    user: ''

}
