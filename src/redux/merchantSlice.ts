import { createSlice } from '@reduxjs/toolkit';

const merchantSlice = createSlice({
  name: 'merchants',
  initialState: {
    merchants: [
      {
        name: 'ShirtTown',
        itemSold: 'T-shirts',
        cryptoInvoice: 1.43219876,
        cryptocurrency: 'BTC',
      },
    ],
    crytocurrencies: [
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
  },
  reducers: {
    updateRates: (state, action) => {

    },
    addMerchant: (state, action) => {
      
    },
    updateMerchant: (state, action) => {

    },
    deleteMerchant: (state, action) => {

    }
  },
});

export default merchantSlice.reducer;
