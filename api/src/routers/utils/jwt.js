import jwt from 'jsonwebtoken';

/**
 * Create a new jwt
 * @param {number} userId
 * @returns {string}
 */
export function GenerateJWT(userId, restaurantId) {
  return jwt.sign(
    {
      userId,
      restaurantId,
    },
    process.env.JWT_SECRET_KEY,
    {
      algorithm: 'HS256',
      issuer: 'Customenu Menu',
      expiresIn: '1d',
      audience: 'ws app',
    },
  );
}

/**
 * Decode a JWT
 * @param {string} authorizationHeader
 * @param {object} res - response
 * @returns {object}
 */
export function DecodeJWT(authorizationHeader) {
  if (!authorizationHeader || authorizationHeader.search('Bearer ') === -1) {
    throw Error('The username or password are incorrect, please login again.');
  }

  // get the token from headers
  const token = authorizationHeader.split(' ')[1];

  // decrypt the token
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}
