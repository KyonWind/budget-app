export interface IPayments {
  name?: string;
  type?: string;
  description?: string;
  cost: string;
  quotationUSD?: number;
  category?: string;
  url: string;
  paymentMethod?: string;
  date?: string;
  installments: number;
  id?: string;
}

export interface IFiltersPayments {
  name?: string;
  type?: string;
  description: string;
  cost: string;
  quotationUSD?: number;
  category?: string;
  url: string;
  paymentMethod?: string;
  date?: string;
  installments: number;
  id?: string;
}
