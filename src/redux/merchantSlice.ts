import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cryptocurrency, Merchant } from '../utils/interfaces';
interface MerchantSliceState {
  merchants: Merchant[];
  cryptocurrencies: Cryptocurrency[];
  loading: boolean;
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
  loading: false,
  merchants: [
    {
      id: 1,
      name: 'Capsule Corp',
      itemSold: 'Capsules',
      cryptoInvoice: 1.43219876,
      cryptocurrency: 'BTC',
    },
    {
      id: 2,
      name: 'Chain of Memories',
      itemSold: 'Keychains',
      cryptoInvoice: 1.56439811,
      cryptocurrency: 'ETH',
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
    addMerchant: (state, { payload }) => {
      state.merchants.push(payload);
    },
    updateMerchant: (state, { payload }) => {
      const index = state.merchants.findIndex(
        (merchant) => merchant.id === payload.id
      );
      console.log(payload);
      state.merchants[index] = payload;
    },
    deleteMerchant: (state, { payload }) => {
      const index = state.merchants.findIndex(
        (merchant) => merchant.id === payload
      );
      state.merchants.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRates.fulfilled, (state, { payload }) => {
      state.cryptocurrencies = payload || [];
      state.loading = false;
    });
  },
});

export const { addMerchant, updateMerchant, deleteMerchant } =
  merchantSlice.actions;

export default merchantSlice.reducer;
