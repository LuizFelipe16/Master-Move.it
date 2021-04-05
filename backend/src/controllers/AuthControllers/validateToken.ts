import { Request, Response } from 'express';
import jwt from 'jwt-simple';

const { authSecret } = require('../../.env');

export default async function validateToken(request: Request, response: Response) {
  const userDate = request.body || null;

  try {
    if(userDate) {
      const token = jwt.decode(userDate.token, authSecret);

      if(new Date(token.exp * 1000) > new Date()) {
        return response.send(true);
      }
    }
  
  } catch (err) {
    return response.status(400).json({
      error: 'Token Inválido'
    });
  }

  response.send(false);
}