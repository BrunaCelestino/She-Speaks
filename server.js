/* eslint-disable no-console */
const app = require('./src/app');

const { PORT } = process.env || 8099;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`);
});
