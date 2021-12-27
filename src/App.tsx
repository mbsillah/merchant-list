import { useEffect } from 'react';
import { useAppSelector } from './redux/hooks';
import { updateExchangeRates } from './api/api';
import './App.css';

function App() {
  const merchants = useAppSelector((state) => state.merchants);
  const cryptocurrencies = useAppSelector((state) => state.crytocurrencies);

  useEffect(() => {
    updateExchangeRates(cryptocurrencies);
  }, []);

  return (
    <div className="App">
      <ul>
        {merchants.map((merchant) => {
          return (
            <li>
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
