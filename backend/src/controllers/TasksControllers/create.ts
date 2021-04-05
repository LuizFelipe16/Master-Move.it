import { Request, Response } from 'express';
import db from '../../database/connection';

function isAmount(difficulty: string) {
  if(difficulty === 'very-hard') {
    return 350;
  }

  if(difficulty === 'hard') {
    return 200;
  }

  if(difficulty === 'average') {
    return 100;
  }

  if(difficulty === 'easy') {
    return 70;
  }

  return 100;
}

export default async function create(request: Request, response: Response) {
  const { id } = request.params;

  const {
    type,
    description,
    difficulty
  } = request.body;

  const amount = isAmount(difficulty);

  try {

    await db('tasks').insert({
      description,
      type,
      amount,
      user_id: id
    });

    return response.status(200).json({
      message: 'Tarefa criada com sucesso.'
    });

  } catch (err) {
    return response.status(400).json({
      error: 'Não foi possível adicionar a Tarefa.'
    });
  }
}