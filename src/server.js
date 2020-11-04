import app from './app';

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${process.env.APP_PORT}`);
});
