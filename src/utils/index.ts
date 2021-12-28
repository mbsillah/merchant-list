
export const createTotal = (crypto: number, dollarRate: number) => {
  return (crypto * dollarRate).toFixed(8);
};
