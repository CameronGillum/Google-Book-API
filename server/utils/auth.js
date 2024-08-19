const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: ({ req }) => {
    let token = req.headers.authorization || '';

    if (token) {
      token = token.split(' ').pop().trim();

      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
    }

    return req;
  },
};
