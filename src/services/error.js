export default function handleError(error) {
  // error is send from our backend
  if (typeof error === 'object' && error.code && error.message) {
    // eslint-disable-next-line no-console
    console.error('error ws', error);
  }
}
