/* eslint-disable no-console */
const app = require('./src/app');

const { PORT } = process.env || 8099;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`server running on port ${PORT}.`);
});
