import Cookies from 'js-cookie';
import jsonWebTokenService from 'jsonwebtoken';

export function saveToken(token: any) {
  try {
    if (token) {
      const decodedToken = jsonWebTokenService.decode(token);

      Cookies.set('token', token);

      return true;
    }

  } catch (err) {
    if (err instanceof jsonWebTokenService.JsonWebTokenError)
      return false;
    throw err
  }
}