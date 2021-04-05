import { Request, Response } from 'express';
import db from '../../database/connection';

import ProfileView from '../../views/profiles_view';

export default async function show(request: Request, response: Response) {
  const { id } = request.params;

  try {

    const profile = await db('profiles').where('user_id', '=', id).select('*').first();

    return response.status(200).json(ProfileView.render(profile));

  } catch(err) {
    return response.status(400).json({
      error: 'Não foi possível. Tente mais Tarde.'
    });
  }
}