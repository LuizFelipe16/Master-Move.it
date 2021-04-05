import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../../database/connection';

export default async function create(request: Request, response: Response) {
  const {
    name,
    email,
    gender,
    password,
    confirmPassword
  } = request.body;

  try {
    
    if (password !== confirmPassword) {
      return response.json({
        error: 'Ops! Senhas não conferem.'
      });
    }

    const passwordEncrypted = await bcrypt.hash(password, 8);

    const searchUsersIsEmailExists = await db('users').where('users.email', email);

    if (searchUsersIsEmailExists.length) {
      return response.json({
        error: 'Esse email já está cadastrado.'
      });
    }

    await db('users').insert({
      name,
      email,
      gender,
      password: passwordEncrypted
    });

    return response.status(200).json({
      message: 'Usuário registrado com Sucesso!'
    });

  } catch (err) {
    return response.status(400).json({
      error: 'Desculpe, não foi possível fazer seu registro.'
    });
  }
}