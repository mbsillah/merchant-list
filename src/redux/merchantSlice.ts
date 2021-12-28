import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cryptocurrency, Merchant } from '../utils/interfaces';
interface MerchantSliceState {
  merchants: Merchant[];
  cryptocurrencies: Cryptocurrency[];
}

export const getRates = createAsyncThunk(
  'merchants/fetchRates',
  async (cryptocurrencies: Cryptocurrency[]) => {
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
      return data.flat() as Cryptocurrency[];
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState: MerchantSliceState = {
  merchants: [
    {
      name: 'ShirtTown',
      itemSold: 'T-shirts',
      cryptoInvoice: 1.43219876,
      cryptocurrency: 'BTC',
    },
  ],
  cryptocurrencies: [
    {
      code: 'BTC',
      name: 'Bitcoin',
      rate: 0,
    },
    {
      code: 'BCH',
      name: 'Bitcoin Cash',
      rate: 0,
    },
    {
      code: 'ETH',
      name: 'Ethereum',
      rate: 0,
    },
  ],
};

const merchantSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    addMerchant: (state, action) => {},
    updateMerchant: (state, action) => {},
    deleteMerchant: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getRates.fulfilled, (state, action) => {
      state.cryptocurrencies = action.payload || [];
    });
  },
});

export const { addMerchant, updateMerchant, deleteMerchant } =
  merchantSlice.actions;

export default merchantSlice.reducer;
