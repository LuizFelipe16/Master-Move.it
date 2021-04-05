import { Request, Response } from 'express';
import db from '../../database/connection';

export default async function create(request: Request, response: Response) {
  const user = request.params;

  try {

    await db('profiles').insert({
      level: 1,
      xp: 40,
      tasks_completed: 0,
      user_id: user.id
    });

    return response.status(200).json({
      message: 'Perfil do Jogador criado com sucesso.'
    });

  } catch(err) {
    return response.status(400).json({
      error: 'Não foi possível criar seu perfil. Tente mais Tarde.'
    });
  }
}