export interface IPayment {
  id: string;
  name?: string;
  type?: string;
  description?: string;
  cost: string;
  quotationUSD?: number;
  category?: string;
  url: string;
  paymentMethod?: string;
  date?: string;
}
