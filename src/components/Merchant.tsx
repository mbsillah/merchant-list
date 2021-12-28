import React, { useState } from 'react';
import { createTotal, findPrice } from '../utils';
import { Cryptocurrency, Merchant } from '../utils/interfaces';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { deleteMerchant } from '../redux/merchantSlice';
import Form from './Form';

type MerchantProps = {
  merchant: Merchant;
  cryptocurrencies: Cryptocurrency[];
};

const MerchantBlock = ({ merchant, cryptocurrencies }: MerchantProps) => {
  const [editing, setEditing] = useState(false);
  const loading = useAppSelector((state) => state.loading);
  // const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  return (
    <div className="merchant">
      {editing ? (
        <Form
          cryptocurrencies={cryptocurrencies}
          merchant={merchant}
          closeForm={setEditing}
        />
      ) : (
        <React.Fragment>
          <div className="top-row">
            <div className="item-container border">
              <span className="label">Merchant Name:</span>
              <span>{merchant.name}</span>
            </div>
            <div className="item-container">
              <span className="label">Item Sold:</span>
              <span>{merchant.itemSold}</span>
            </div>
          </div>
          <div className="bottom-row">
            <div className="item-container border">
              <span className="label">Cryptocurrency Used:</span>
              <span>{merchant.cryptocurrency}</span>
            </div>
            <div className="item-container border">
              <span className="label">Amount Invoiced in Cryptocurrency:</span>
              <span>{merchant.cryptoInvoice}</span>
            </div>
            <div className="item-container border">
              <span className="label">Current USD Rate of Cryptocurrency:</span>
              {loading ? (
                <div className="loader"></div>
              ) : (
                <span>
                  ${findPrice(merchant.cryptocurrency, cryptocurrencies)}
                </span>
              )}
            </div>
            <div className="item-container">
              <span className="label">Amount Invoice (USD):</span>
              {loading ? (
                <div className="loader"></div>
              ) : (
                <span>
                  $
                  {createTotal(
                    merchant.cryptoInvoice,
                    merchant.cryptocurrency,
                    cryptocurrencies
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="buttons no-border-top">
            <button
              className={editing ? 'secondary' : 'edit'}
              onClick={() => setEditing(!editing)}
            >
              {editing ? 'Cancel Edit' : 'Edit'}
            </button>
            {!editing && (
              <button
                className="secondary"
                onClick={() => {
                  dispatch(deleteMerchant(merchant.id));
                }}
              >
                Delete
              </button>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MerchantBlock;
