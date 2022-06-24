/* eslint-disable import/first */
require('dotenv').config({ path: `${__dirname}/../../.env` });

import app from './app';
// todo: test docker cache

app.listen(process.env.API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${process.env.API_PORT}`);
});
