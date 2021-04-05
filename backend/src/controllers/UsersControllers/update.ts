import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../../database/connection';

export default async function update(request: Request, response: Response) {
  const { id } = request.params;

  const {
    name,
    email,
    gender,
    password,
  } = request.body;

  try {
    
    const passwordEncrypted = await bcrypt.hash(password, 8);

    await db('users').where('id', '=', id).update({
      name,
      email,
      gender,
      password: passwordEncrypted
    });

    return response.status(200).json({
      message: 'Usuário atualizado com Sucesso!'
    });

  } catch (err) {
    return response.status(400).json({
      error: 'Desculpe, não foi possível fazer sua atualização.'
    });
  }
}