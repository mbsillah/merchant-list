import { useState, useEffect } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { getRates } from './redux/merchantSlice';
import MerchantBlock from './components/Merchant';
import Form from './components/Form';

const App = () => {
  const merchants = useAppSelector((state) => state.merchants);
  const cryptocurrencies = useAppSelector((state) => state.cryptocurrencies);
  const [createMerchant, setCreateMerchant] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRates(cryptocurrencies));
  }, []);

  useInterval(() => {
    dispatch(getRates(cryptocurrencies));
  }, 120000);

  return (
    <div className="App">
      <div style={{ marginBottom: '2rem' }}>
        {merchants.map((merchant) => {
          return (
            <MerchantBlock
              key={merchant.id}
              merchant={merchant}
              cryptocurrencies={cryptocurrencies}
            />
          );
        })}
      </div>
      {createMerchant && (
        <Form
          cryptocurrencies={cryptocurrencies}
          closeForm={setCreateMerchant}
        />
      )}

      {createMerchant ? null : (
        <button className="primary" onClick={() => setCreateMerchant(true)}>
          New Merchant
        </button>
      )}
    </div>
  );
};

export default App;
