import axios from 'axios';
import { Cryptocurrency } from '../interfaces';

export const updateExchangeRates = async (
  cryptocurrencies: Cryptocurrency[]
) => {
  try {
    const urls = cryptocurrencies.map(
      (crypto: Cryptocurrency) =>
        `https://bitpay.com/api/rates/${crypto.code}/USD`
    );
    const response = await Promise.all(
      urls.map((endpoint: string) => axios.get(endpoint))
    );
    const data = response.map((res, index) => {
      return {
        code: cryptocurrencies[index].code,
        name: cryptocurrencies[index].name,
        rate: res.data.rate,
      };
    });
    console.log(data.flat());
  } catch (err) {
    console.log(err);
  }
};
