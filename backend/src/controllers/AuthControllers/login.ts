import { Request, Response } from 'express';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import db from '../../database/connection';

const { authSecret } = require('../../.env');

export default async function login(request: Request, response: Response) {
  const {
    email,
    password
  } = request.body;

  try {

    const isUserExists = await db('users').where({ email }).first();

    if (!isUserExists) {
      return response.json({ error: 'Email/Senha Inválido!' });
    }

    const user = isUserExists;

    const compareForConfirmPasswordUser = bcrypt.compareSync(
      password as string,
      user.password as string
    );

    if(!compareForConfirmPasswordUser) {
      return response.json({ error: 'Email/Senha Inválido!' });
    }

    const isProfilesExists = await db('profiles').where('user_id', '=', user.id).first();

    if (!isProfilesExists) {
      await db('profiles').insert({
        level: 1,
        xp: 40,
        tasks_completed: 0,
        user_id: user.id
      });

      await db('tasks').insert({
        description: 'Estique um de seus braços com a palma da mão virada para frente e puxe os dedos para cima por 10 segundos por mão.',
        type: 'body',
        amount: 100,
        user_id: user.id
      });
    }

    // Começar Autenticação

    const nowHourOrDate = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      iat: nowHourOrDate,
      exp: nowHourOrDate + (60 * 60 * 24)
    }

    const token = jwt.encode(payload, authSecret);

    return response.status(200).json({
      ...payload,
      token,
      message: 'Login efetuado com sucesso.'
    });
  
  } catch (err) {
    return response.status(400).json({
      error: 'Erro ao Tentar entrar na aplicação.'
    });
  }
}