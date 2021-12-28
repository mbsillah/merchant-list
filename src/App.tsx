import { useEffect } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { getRates } from './redux/merchantSlice';
import './App.css';

function App() {
  const merchants = useAppSelector((state) => state.merchants);
  const cryptocurrencies = useAppSelector((state) => state.cryptocurrencies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRates(cryptocurrencies));
  }, []);

  useInterval(() => {
    dispatch(getRates(cryptocurrencies));
  }, 120000);

  return (
    <div className="App">
      <ul>
        {merchants.map((merchant, index) => {
          return (
            <li key={index}>
              <div>{merchant.name}</div>
              <div>{merchant.itemSold}</div>
              <div>{merchant.cryptoInvoice}</div>
              <div>{merchant.cryptocurrency}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
