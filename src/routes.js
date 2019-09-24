import express from 'express';

import { log } from './utils';
import { cryptoList } from './modules/cryptocurrency';

const router = new express.Router();
console.log(cryptoList);

router.post('/slack/command/cryptocurrency', async (req, res) => {
  try {
    const slackReqObj = req.body;
    const response = {
      response_type: 'in_channel',
      channel: slackReqObj.channel_id,
      text: 'You ask for a crypto currency :bitcoin:',
      attachments: [{
        text: 'What crypto currency would you like to see?',
        fallback: 'What crypto currency would you like to see?',
        color: '#2c963f',
        attachment_type: 'default',
        callback_id: 'crypto_selection',
        actions: [{
          name: 'cryptos_select_menu',
          text: 'Choose a crypto...',
          type: 'select',
          options: cryptoList,
        }],
      }],
    };
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
});

router.post('/slack/actions', async (req, res) => {
  try {
    const slackReqObj = JSON.parse(req.body.payload);
    let response;
    if (slackReqObj.callback_id === 'crypto_selection') {
      log(slackReqObj);
      // response = await generatecrypto({ slackReqObj });
    }
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
});

export default router;
