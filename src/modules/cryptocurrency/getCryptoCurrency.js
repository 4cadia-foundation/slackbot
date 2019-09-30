import config from 'config';
import request from 'request';

const coinAPI = config.get('coinAPI');
console.log(coinAPI.URL);

export const cryptoOptions = () => new Promise((resolve, reject) => {
  const responseUrl = coinAPI.URL;
  const path = '/assets?limit=10';

  const options = {
    url: responseUrl + path,
    method: 'GET',
  };

  request(options, (err, response, body) => {
    if (err) {
      reject(err);
    } else if (response.statusCode !== 200) {
      reject(body);
    } else {
      const Json = JSON.parse(body);
      console.log(Json);
      resolve(Json);
    }
  });
});

export default cryptoOptions;
