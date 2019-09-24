import getCryptoCurrency from './getCryptoCurrency';

console.log(getCryptoCurrency);

export const cryptoList = Object.entries(getCryptoCurrency)
  .map(([key, value]) => {
    const report = {
      text: value.name,
      value: key,
    };
    return report;
  });

export default cryptoList;
