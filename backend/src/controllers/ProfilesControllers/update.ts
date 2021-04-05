import { Request, Response } from 'express';
import db from '../../database/connection';

export default async function update(request: Request, response: Response) {
  const { id } = request.params;

  const {
    level,
    xp,
    tasks_completed,
  } = request.body;

  try {

    await db('profiles').where('user_id', '=', id).update({
      level,
      xp,
      tasks_completed,
    });

    return response.status(200).json({
      message: 'Perfil do Jogador atualizado com sucesso.'
    });

  } catch(err) {
    return response.status(400).json({
      error: 'Não foi possível atualizar seu perfil. Tente mais Tarde.'
    });
  }
}