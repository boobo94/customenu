export default async (req, res, next) => {
  const language = req.headers['accept-language'];

  if (!language) req.headers['accept-language'] = 'en';

  return next();
};
