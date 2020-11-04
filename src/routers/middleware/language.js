export default async (req, res, next) => {
  const language = req.headers['Accept-Language'];

  if (!language)req.headers['Accept-Language'] = 'en';

  return next();
};
