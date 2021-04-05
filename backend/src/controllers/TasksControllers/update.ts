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


export default async function update(request: Request, response: Response) {
  const { id } = request.params;

  const {
    description,
    difficulty,
    user_id
  } = request.body;

  const amount = isAmount(difficulty);

  try {
    await db('tasks').where('id', '=', id).update({
      description,
      type: 'body',
      amount,
      user_id
    });

    return response.status(200).json({
      message: 'Tarefa Atualizada.'
    });
  
  } catch(err) {
    return response.status(400).json({
      error: 'Ocorreu um erro ao tentar atualizar as tarefas.'
    });
  }
}
