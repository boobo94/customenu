import EventBus from '../components/notifications/EventBus';

export default function handleError(error) {
  // error is send from our backend
  if (typeof error === 'object' && error.code && error.message) {
    EventBus.$emit('error', error.message);
    // eslint-disable-next-line no-console
    console.error('error ws', error);
  }
}
