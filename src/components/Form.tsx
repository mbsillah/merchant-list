import { useForm } from 'react-hook-form';
import { Cryptocurrency, Merchant } from '../utils/interfaces';
import { useAppDispatch } from '../redux/hooks';
import { addMerchant, updateMerchant } from '../redux/merchantSlice';

type FormProps = {
  merchant?: Merchant;
  cryptocurrencies: Cryptocurrency[];
  closeForm: (active: boolean) => void;
};

type FormData = {
  id: number;
  name: string;
  itemSold: string;
  cryptoInvoice: number;
  cryptocurrency: string;
};

const Form = ({ merchant, cryptocurrencies, closeForm }: FormProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      id: merchant ? merchant.id : Math.floor(Math.random() * 500),
      name: merchant ? merchant.name : '',
      itemSold: merchant ? merchant.itemSold : '',
      cryptoInvoice: merchant ? merchant.cryptoInvoice : 0,
      cryptocurrency: merchant ? merchant.cryptocurrency : '',
    },
  });
  const onSubmit = handleSubmit((data) => {
    if (merchant) {
      dispatch(
        updateMerchant({
          ...data,
          cryptoInvoice: Number(data.cryptoInvoice).toFixed(8),
        })
      );

      closeForm(false);
    } else {
      dispatch(
        addMerchant({
          ...data,
          cryptoInvoice: Number(data.cryptoInvoice).toFixed(8),
        })
      );
      closeForm(false);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      style={
        merchant
          ? {}
          : {
              boxShadow:
                'rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px',
              borderRadius: '7px',
              padding: '2px',
              background: '#f7f7f7',
            }
      }
    >
      <div className="top-row">
        <div className="item-container border">
          <span className="label">Merchant Name:</span>
          <input {...register('name')} />
        </div>
        <div className="item-container">
          <span className="label">Item Sold:</span>
          <input {...register('itemSold')} />
        </div>
      </div>
      <div className="bottom-row-edit">
        <div className="item-container border">
          <span className="label">Cryptocurrency Used:</span>
          <select {...register('cryptocurrency')}>
            {cryptocurrencies.map((crypto) => (
              <option key={crypto.code} value={crypto.code}>
                {crypto.code}
              </option>
            ))}
          </select>
        </div>
        <div className="item-container">
          <span className="label">Amount Invoiced in Cryptocurrency:</span>
          <input
            step="any"
            min="0"
            type="number"
            {...register('cryptoInvoice')}
          />
        </div>
      </div>
      <div className="buttons">
        <button className="accept" type="submit">
          Submit
        </button>
        <button className="secondary" onClick={() => closeForm(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
