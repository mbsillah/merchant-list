import { Cryptocurrency } from './interfaces';

export const createTotal = (
  cryptoInvoice: number,
  code: string,
  cryptocurrencies: Cryptocurrency[]
) => {
  const crypto = cryptocurrencies.find((coin) => coin.code === code);
  const rate = crypto?.rate || 0;
  return (rate * cryptoInvoice).toFixed(2);
};

export const findPrice = (code: string, cryptocurrencies: Cryptocurrency[]) => {
  const crypto = cryptocurrencies.find((coin) => coin.code === code);
  return crypto?.rate?.toFixed(2);
};
