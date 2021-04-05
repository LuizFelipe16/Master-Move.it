import { Request, Response } from 'express';
import db from '../../database/connection';
import tasksView from '../../views/tasks_view';

export default async function index(request: Request, response: Response) {
  const { id } = request.params;

  try {
    const tasks = await db('tasks').where('user_id', '=', id).select();

    return response.status(200).json(tasksView.renderMany(tasks));
  
  } catch(err) {
    return response.status(400).json({
      error: 'Ocorreu um erro ao tentar ver as tarefas.'
    });
  }
}
