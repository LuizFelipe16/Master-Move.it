import { Request, Response } from 'express';
import db from '../../database/connection';
import userView from '../../views/users_view';

export default async function index(request: Request, response: Response) {
  try {
    const users = await db('users');

    return response.status(200).json(userView.renderMany(users));
  
  } catch (err) {
    return response.status(400).json({
      error: 'Não foi possível realizar a consulta.'
    });
  }
}