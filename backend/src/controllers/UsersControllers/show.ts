import { Request, Response } from 'express';
import db from '../../database/connection';
import userView from '../../views/users_view';

export default async function show(request: Request, response: Response) {
  const { id } = request.params;

  if(!id) {
    return response.json({
      error: 'Dados do usuário não podem ser retornados.'
    });
  }

  try {
    const user = await db('users').where('users.id', id).first();

    return response.status(200).json(userView.render(user));
  
  } catch (err) {
    return response.status(400).json({
      error: 'Não foi possível realizar a consulta.'
    });
  }
}