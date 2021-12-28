export interface Merchant {
  name: string;
  itemSold: string;
  cryptoInvoice: number;
  cryptocurrency: string;
}

export interface Cryptocurrency {
  code: string;
  name: string;
  rate: number;
}
