import { Request, Response } from 'express';
import db from '../../database/connection';

export default async function del(request: Request, response: Response) {
  const { id } = request.params;

  try {
    await db('tasks').where('id', '=', id).delete();

    return response.status(200).json({
      message: 'Tarefa Apagada.'
    });
  
  } catch(err) {
    return response.status(400).json({
      error: 'Ocorreu um erro ao tentar deletar as tarefas.'
    });
  }
}
